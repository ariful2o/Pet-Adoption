import { useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa6';
import { FcSms } from "react-icons/fc";
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/axios/useAxiosSecure';
import useUser from '../../hooks/userInfo/useUser';

export default function BlogDetails() {
  const { displayName, photoURL } = useUser()
  const [showComment, setShowComment] = useState(false)

  const id = useParams().id
  const axiosSecure = useAxiosSecure()

  const { data, refetch } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blog?id=${id}`)
      return res.data;
    }
  })

  const handlePostComment = async (e) => {
    e.preventDefault();
    const commentText = e.target.comment.value;
    if (!commentText) return;
    const comment = {
      comment: commentText,
      author: { displayName, photoURL },
      dateAdded: new Date(),
    }
    const postComment = await axiosSecure.post(`/postcomment?id=${data._id}`, comment)
    if (postComment.data.acknowledged) {
      e.target.comment.value = ''
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your comment has been post",
        showConfirmButton: false,
        timer: 1500
      });
      refetch()
    }
  }
  return (
    <div className='p-2 lg:p-8'>
      <h1 className='text-2xl lg:text-3xl font-bold py-4'>{data?.title}</h1>
      <p className="">{data?.shortDescription}</p>
      <img className='w-full h-60 md:h-80 lg:h-[500px] px-2 lg:px-10 my-8' src={data?.image} alt="" />
      <p className="my-4 leading-7 lg:leading-9">{data?.longDescription}</p>

      <div className="card-actions   justify-between ">
        <div className="flex items-center gap-4">
          <img className='w-12 h-12 rounded-full' src={data?.author?.photoURL} alt={data?.author?.displayName} />
          <div className="">
            <h4 className="">{data?.author?.displayName}</h4>
            <span className="text-xs text-gray-500">Publish :{new Date(data?.dateAdded).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex gap-5">
          <button className="btn" onClick={() => setShowComment(!showComment)}>
            <FaRegCommentDots className='text-3xl' />
            Comments
            <div className="badge">{data?.comments?.length}</div>
          </button>
          <label htmlFor="my_modal_7" className="btn"><FcSms /></label>
        </div>
      </div>
      {
        showComment && data?.comments?.map((comment, index) => (
          <div key={index} className="flex items-center gap-4 mt-4">
            <img className='w-10 h-10 rounded-full' src={comment.author.photoURL} alt={comment.author.displayName} />
            <div className="bg-[#eaedf0] p-1 px-5 rounded-lg">
              <h4 className="">{comment.author.displayName}</h4>
              <p className='text-gray-500'>{comment.comment}</p>
            </div>
          </div>
        ))
      }



      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">

          <form onSubmit={handlePostComment}>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
              Your message
            </label>
            <textarea
              name="comment"
              id="message"
              rows="4"
              required
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            {/* Flex container to align the button to the end */}
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  Post
                </span>
              </button>
            </div>
          </form>


        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </div>

    </div>
  )
}
