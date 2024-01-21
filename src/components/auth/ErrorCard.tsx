import  Header  from '@/components/auth/Header';
import  BackButton  from '@/components/auth/BackButton'
import {
    Card,
    CardFooter,
    CardHeader
} from '@/components/ui/card'

 const ErrorCard = () => {
    return (
        <Card className='w-[500px] shadow-md'>
            <CardHeader>
                <Header label="Oops! something went wrong" />
            </CardHeader>
            <CardFooter>
                <BackButton 
                    label="Back to login"
                    href="/auth/login"
                />
            </CardFooter>
        </Card>
    )
}

export default ErrorCard;