import { useRouter } from "next/router";

export default function Car({car}){
  const router = useRouter()
  const {id} = router.query

  return <h1>Car {id}</h1>
}

export async function getStaticProps({params}){
  const req = await fetch(`https://localhost:3000/${params.id}`)
  const data = req.json()

  return {
    props: { car: data }
  }
}

export async function getStaticPaths(){
  const req = await fetch(`https://localhost:3000/cars.json`)
  const data = await req.json()

  const paths = data.map(car => {
    return {params: { id: car }}
  })

  return {
    paths,
    callback: false,
  }
}