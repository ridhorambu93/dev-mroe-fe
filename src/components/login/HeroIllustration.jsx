// import buildingImage from "../../assets/images/bjb-building.png"
import sigmaImage from "../../assets/images/bjb-sigma.png"

const HeroIllustration = () => {
  return (
    <div className="hidden lg:flex justify-center">
      <img
        src={sigmaImage}
        alt="BJB Sigma"
        className="max-w-full w-full mix-blend-multiply"
      />
    </div>
  )
}

export default HeroIllustration
