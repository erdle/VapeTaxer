import React, {useCallback, useState} from 'react';
import {Popover, ActionList, Button} from '@shopify/polaris';
import DateTo from './DateTo'

export default function PopoverTo() {
    const [popoverActive, setPopoverActive] = useState(false);
  
    const togglePopoverActive = useCallback(
      () => setPopoverActive((popoverActive) => !popoverActive),
      [],
    );
  
    const activator = (
      <Button onClick={togglePopoverActive} disclosure>
        To
      </Button>
    );
  
    return (
      <div style={{height: '250px'}}>
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
        >
          <DateTo />
        </Popover>
      </div>
    );
  }