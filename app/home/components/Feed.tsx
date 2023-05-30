import FeedItem from "./feedItem"

const Feed = () => {
  return (
    <>
      <div className="flex flex-col w-full border-r">
        <div className="flex flex-col w-full">
          <h1 className="flex w-full text-2xl font-extrabold leading-tight tracking-tighter sm:text-2xl md:text-2xl lg:text-2xl p-4">Feed</h1>
            <div className="flex flex-col w-full">
              <FeedItem />
              <FeedItem />
              <FeedItem />
            </div>
        </div>
      </div>
    </>
  )
}

export default Feed