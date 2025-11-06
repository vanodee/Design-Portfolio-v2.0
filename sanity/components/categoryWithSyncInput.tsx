import { useEffect } from 'react'
import {
  set,
  unset,
  type ObjectInputProps,
  type ReferenceValue,
  useClient,
  useFormValue,
  PatchEvent,
} from 'sanity'

export default function CategoryWithSyncInput(props: ObjectInputProps) {
  const { onChange, value, renderDefault, path } = props
  const client = useClient({ apiVersion: '2023-10-01' })

  // Get full document (so we can access categoryName)
  const doc = useFormValue([]) as Record<string, any> | null

  useEffect(() => {
    async function syncCategoryName() {
      if (!value?._ref) {
        // If the category reference is cleared → remove the categoryName field
        props.onChange(PatchEvent.from(unset()))
        return
      }

      try {
        // Fetch category document to get its title
        const category = await client.fetch<{ title: string } | null>(
          `*[_id == $id][0]{title}`,
          { id: value._ref }
        )

        if (category?.title && doc?.categoryName !== category.title) {
          // Use the client to patch the categoryName field directly
          await client.patch(doc?._id).set({ categoryName: category.title }).commit()
        }
      } catch (err) {
        console.error('Error syncing category name:', err)
      }
    }

    syncCategoryName()
  }, [value?._ref])

  // Render the normal reference input UI
  return renderDefault(props)
}
