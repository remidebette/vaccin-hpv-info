import React, { useState } from 'react'
import {
  TextSection,
  Quote,
  FullWidthImage,
  ImageGallery,
  ImageHighlight
} from './'
import { Accordion } from "semantic-ui-react";

const SliceZone = ({ sliceZone }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (event, data) => {
    event.persist();
    if (data.index === activeIndex) {
      setActiveIndex(-1)
    } else {
      setActiveIndex(data.index)
    }
  };

  return (
    <Accordion fluid styled>
      {sliceZone.map((slice, index) => {
        switch (slice.slice_type) {
          case ('text_section'):
            return <TextSection
              slice={slice}
              key={'slice-' + index}
              index={index}
              active={activeIndex === index}
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
