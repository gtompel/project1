import BlogCard from "../components/BlogCard";
import Button from "../components/Button";
import { bannerBlog } from "../constant";

const Blog = () => {
  return (
    <div>
      <div className="text-center py-[80px]">
        <h4 className="small-text">Recent News</h4>
        <h2 className="head-text">
          Check Our Blog <br /> <span className="gradientText"> Posts. </span>
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-7">
        <div className="shadow-xl shadow-gray-300 rounded-3xl flex-1 md:w-1/2 mr-10">
          <img
            src={bannerBlog.imgUrl}
            alt="image"
            className="w-full rounded-t-3xl"
          />
          <div className="p-5">
            <div className="flex flex-row justify-between items-center pb-4">
              <Button title="SEO Analysis" fill={true} />
              <p className="blog-para">03 Auguest 2040</p>
            </div>
            <div>
              <h3 className="blog-title">{bannerBlog.title}</h3>
              <p className="blog-para">{bannerBlog.desc}</p>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-4">
                  <img
                    src={bannerBlog.authorImg}
                    alt="author"
                    className="rounded-full"
                  />
                  <span>{bannerBlog.authorName}</span>
                </div>
                <Button title="Discover  Now" fill={false} />
              </div>
            </div>
          </div>
        </div>
        <BlogCard />
      </div>
    </div>
  );
};

export default Blog;