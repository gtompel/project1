import { blogs } from "../constant";
import Button from "./Button";

const BlogCard = () => {
  return (
    <div className="flex flex-col gap-6 ">
      {blogs.map((blog) => (
        <div className="flex flex-col md:flex-row gap-3 bg-slate-400 p-5 rounded-xl" key={blog.imgUrl}>
          <img
            src={blog.imgUrl}
            alt="blog"
            className="rounded-xl max-w-xs object-contain"
          />
          <div>
            <div className="flex flex-row justify-start md:justify-between gap-5 items-center mb-6">
              <Button title="Seo Analysis" fill={true} />
              <p className="blog-para">{blog.data}</p>
            </div>
            <h3 className="blog-title">{blog.title}</h3>
            <h5 className="blog-para">{blog.desc}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;