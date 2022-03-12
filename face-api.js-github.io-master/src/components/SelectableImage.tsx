import * as React from 'react';

import { ImageWithOverlay } from './ImageWithOverlay';
import { SelectableInputElement, SelectableInputElementBaseProps } from './SelectableInputElement';

export class SelectableImage extends React.Component<SelectableInputElementBaseProps> {
  render() {
    return (
      <SelectableInputElement
        {...this.props}
        accept="image/*"
        renderMediaElement={props =>
          <ImageWithOverlay
            imageSrc={props.src}
            onLoaded={props.onLoaded}
            imageStyle={props.mediaElementStyle}
          />
        }
      />
    )
  }
}