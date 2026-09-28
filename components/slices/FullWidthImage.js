const FullWidthImage = ({slice}) => (
    <img src={slice.primary.image.url} alt={slice.primary.image.alt ?? ''} className="w-full"/>
)

export default FullWidthImage
