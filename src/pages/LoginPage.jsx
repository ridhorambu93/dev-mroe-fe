import LoginForm from "../components/login/LoginForm"
import HeroIllustration from "../components/login/HeroIllustration"

const LoginPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 min-h-screen lg:min-h-[700px] items-center">
          <LoginForm />
          <HeroIllustration />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
