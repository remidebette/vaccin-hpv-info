import React, {useEffect, useState} from 'react'
import {Accordion} from "semantic-ui-react";
import TextSection from "./TextSection";
import Quote from "./Quote";
import FullWidthImage from "./FullWidthImage";
import ImageGallery from "./ImageGallery";
import ImageHighlight from "./ImageHighlight";

const SliceZone = ({ sliceZone, default_section }) => {
  const [activeSection, setSection] = useState(default_section);

  const handleClick = (event, data) => {
    event.persist();
    if (data.section === activeSection) {
      setSection(null)
    } else {
      setSection(data.section)
    }
  };

  useEffect(() => {
    setSection(default_section)
  }, [default_section])

  return (
    <Accordion fluid styled>
      {sliceZone.map((slice, index) => {
        const section = slice.primary.section_id

        switch (slice.slice_type) {
          case ('text_section'):
            return <TextSection
              slice={slice}
              key={'slice-' + index}
              index={index}
              section={section}
              active={activeSection === section}
              handleClick={handleClick}
            />
          case ('quote'):
            return <Quote slice={slice} key={'slice-' + index} />
          case ('full_width_image'):
            return <FullWidthImage slice={slice} key={'slice-' + index} />
          case ('image_gallery'):
            return <ImageGallery slice={slice} key={'slice-' + index} />
          case ('image_highlight'):
            return <ImageHighlight slice={slice} key={'slice-' + index} />
          default:
            return null
        }
      })}
    </Accordion>
  )
}

export default SliceZone
