import React, {useCallback, useState} from 'react';
import {Popover, ActionList, Button} from '@shopify/polaris';
import DateFrom from './DateFrom'

export default function PopoverFrom() {
    const [popoverActive, setPopoverActive] = useState(false);
  
    const togglePopoverActive = useCallback(
      () => setPopoverActive((popoverActive) => !popoverActive),
      [],
    );
  
    const activator = (
      <Button onClick={togglePopoverActive} disclosure>
        From
      </Button>
    );
  
    return (
      <div style={{height: '250px'}}>
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
        >
          <DateFrom />
        </Popover>
      </div>
    );
  }