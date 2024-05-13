import Feed from "@src/components/Feed"

const Home = () => {
  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center head_text text_center">
        Explore the World of
        <br />
        <span className="text-center orange_gradient">Code Crafting</span>
      </h1>
      <p className="text-center desc">
      Dive into a meticulously curated collection of coding insights and creations, where each post reflects the expertise, ingenuity, and passion of its developer.
      </p>

      <Feed />
      
    </section>
  )
}

export default Home
