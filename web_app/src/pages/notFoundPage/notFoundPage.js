function NotFoundPage() {
  return (
      <div class="flex justify-center items-center h-screen">
        <img class = "object none w-80" src={process.env.PUBLIC_URL + '/notfoundtrees.svg'} />
          Not found 404
      </div>)
}

export default NotFoundPage