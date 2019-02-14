# PM
## Javascript dynamic padding, margin, etc. by class name
Add css by class name

## Examples:
p-20 - padding: 20px

pt-20 - padding-top: 20px

vh-sm-100 - for screen >= 540px height: 100vh

## Use:
```javascript
var pm = new PM({
  options...
});
```

## Default options:
```javascript
items: {
  p: ['padding', 'px'],
  pt: ['padding-top', 'px'],
  pb: ['padding-bottom', 'px'],
  pl: ['padding-left', 'px'],
  pr: ['padding-right', 'px'],
  m: ['margin', 'px'],
  mt: ['margin-top', 'px'],
  mb: ['margin-bottom', 'px'],
  ml: ['margin-left', 'px'],
  mr: ['margin-right', 'px'],
  h: ['height', 'px'],
  w: ['width', 'px'],
  vh: ['height', 'vh'],
  vw: ['width', 'vw'],
},
breakpoints: {
  xl: 1440,
  lg: 960,
  md: 720,
  sm: 540
}
```

