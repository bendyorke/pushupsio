import CSS from 'react-css-modules'
export default function CSSModuleDecorator(...args) {
  return CSS(...args, {
    allowMultiple: true,
    errorWhenNotFound: false,
  })
}
