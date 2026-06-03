import MainLayout from "../layouts/MainLayout"
import LoginForm from "../components/login/LoginForm"
import HeroIllustration from "../components/login/HeroIllustration"

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 min-h-[700px] items-center">
            <LoginForm />
            <HeroIllustration />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default LoginPage
