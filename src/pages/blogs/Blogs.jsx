
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import TitleBanner from '../../componts/TitleBanner';
import useBlogs from '../../hooks/blogs/useBlogs';



export default function Blogs() {
  const { blogs, isLoading } = useBlogs()

  if (isLoading) return <div className='w-full min-h-96 flex justify-center items-center'><span className="loading  text-accent loading-ring loading-lg"></span></div>
  return (
    <section>
      <Helmet>
        <title>Pet Adoption | Blogs</title>
      </Helmet>
      <TitleBanner section={`Blogs`} image="https://sp.activepipe.com/image/67488116/W10aDAAHUwBTBgAIHAoCVldMUAAOAUkNVlFRTAJUVFpSDwUIUgxWBQ=="></TitleBanner>
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-8">
          {
            blogs.map(blog => {
              return (
                <div key={blog._id} className="card glass w-full">
                  <figure>
                    <img
                      className='h-80 w-full'
                      src={blog.image}
                      alt="car!" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{blog.title}</h2>
                    <p>{blog.shortDescription}</p>
                    <div className="card-actions justify-between">
                      <div className="flex items-center gap-4">
                        <img className='w-12 h-12 rounded-full' src={blog.author?.photoURL} alt={blog.author?.displayName} />
                        <div className="">
                          <h4 className="">{blog.author?.displayName}</h4>
                          <span className="text-xs text-gray-500">Publish :{new Date(blog.dateAdded).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <NavLink to={`/blogs/${blog._id}`}>
                        <button className="btn btn-primary">Learn now!</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <NavLink to="/addblog">
          <button className='btn btn-info'>Add Blog</button>
        </NavLink>
      </div>
    </section>

  )
}
