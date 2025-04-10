import Button from '@/components/Button'
import Link from 'next/link'

function PageOne() {
  return (
    <div>
        <ul>
            <li>welcome to page one</li>
            <li><Link href={"/concepts/intercepted/one/f1"}><Button>Go to f1 page</Button></Link></li>
        </ul>
    </div>
  )
}

export default PageOne