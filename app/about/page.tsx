import Image from "next/image";
import styles from "./aboutPage.module.scss";

export default function AboutPage() {
  return (
    <div className={styles.aboutPageContainer}>
      
      <h1>A Bit About Me</h1>

      <div className={styles.detailsContainer}>
        <Image
          className={styles.myPhoto}
          src="/stevano_new.webp"
          width={700}
          height={700}
          alt="Photo of Stevano Peters"
        />

        <div className={styles.myAboutText}>
          <p>
            Lorem ipsum dolor sit amet consectetur. Viverra sagittis malesuada porttitor integer nec a egestas. Nunc leo montes nullam blandit eu lectus. Rutrum urna feugiat leo faucibus sem a. Adipiscing platea morbi tempus quis fringilla mauris. Urna nunc adipiscing nibh potenti amet libero eget convallis fermentum. Erat pulvinar ac elementum sed urna a etiam cras. 
            <br />
            <br />
            Eget pellentesque fringilla id posuere quis sed elit nec sed. Aliquam mauris massa sed tristique. Pellentesque eu odio egestas euismod magna. Odio nec amet vitae et viverra mauris justo tincidunt fames. Blandit potenti vitae sed laoreet quis pharetra porta at. Feugiat massa gravida lacus massa. In eget eget non ultricies. Non non ut eget bibendum rhoncus tortor nunc odio. Euismod nulla id integer suspendisse sed. Nec est mi arcu amet. Ut sit accumsan porta ultricies vestibulum massa risus mattis. Tempor auctor ac malesuada elit morbi molestie faucibus fringilla. Ipsum integer scelerisque felis id. 
            <br />
            <br />
            Quam diam enim vitae elementum imperdiet ut eleifend. Nulla tristique nunc sed mauris turpis. Ac placerat platea aliquam in condimentum consectetur leo tincidunt vestibulum. Sagittis cursus suscipit enim risus. Ligula sodales venenatis vulputate quis id tellus porttitor nisl. Amet aenean at a duis diam. Suscipit phasellus tristique dui quam arcu integer integer. Bibendum iaculis ante sed in sed leo a eget placerat. Cras pulvinar nulla in egestas id egestas magna id. Id pellentesque pharetra arcu tristique.
          </p>
        </div>
      </div>
    </div>
  )
}
