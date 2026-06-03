import buildingImage from "../../assets/images/bjb-building.png"

const HeroIllustration = () => {
  return (
    <div className="hidden lg:flex justify-center">
      <img src={buildingImage} alt="Bank BJB Building" className="max-w-full" />
    </div>
  )
}

export default HeroIllustration
