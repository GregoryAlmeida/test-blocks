import families from './families.json'

export async function GET(res: Request) {
  const search = new URL(res.url)
  const skip = Number(search.searchParams.get('skip')) 
  const take = Number(search.searchParams.get('take'))

  const paginatedFamilies = families.slice(skip, skip + take);

  return Response.json(paginatedFamilies)
}