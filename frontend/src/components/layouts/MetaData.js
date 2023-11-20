import { Helmet } from 'react-helmet-async'

export default function MetaData ({title}) {
  return (
    <Helmet>
    <title>{`${title}- vkart`}</title>
    <link rel="icon" type="image/x-icon" href="/images/vkart1.png"/>
    </Helmet>
  )
}
