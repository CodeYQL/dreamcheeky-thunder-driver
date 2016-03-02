# dreamcheeky-thunder-lib

A node driver for the dreamcheeky thunder missile launcher

## install
``` npm install dreamcheeky-thunder-lib ```

## API

### up()
### down()
### left()
### right()
### fire()
### stop()

## Example

```
var thunder = require('dreamcheeky-thunder-driver');

thunder.right();
timeout(thunder.stop, 500);
timeout(thunder.fire, 700);
    
```

