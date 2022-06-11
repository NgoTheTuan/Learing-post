import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducer/postReducer'
import { apiUrl } from '../contexts/contants'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {

    //State
    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)

    //Get all Post

    const getAllPost = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if (response.data.success) {
                dispatch({
                    type: "POSTS_LOADED_SUCCESS",
                    payload: response.data.posts
                })
            }
        } catch (error) {
            dispatch({ type: "POSTS_LOADED_FAIL" })
        }
    }

    const addPost = async (postForm) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, postForm)
            if (response.data.success) {
                dispatch({ type: "ADD_POSTS", payload: response.data.post })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: "Server error" }
        }
    }


    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if (response.data.success) {
                dispatch({ type: "DELETE_POSTS", payload: postId })
                return response.data
            }
        } catch (error) {
            console.log('Error deleting post');
        }
    }


    const findPost = (postId) => {
        const findPost = postState.posts.find(post => post._id === postId)
        dispatch({
            type: 'FIND_POSTS',
            payload: findPost
        })
    }

    const updatePost = async (updatePost) => {
        try {
            console.log(updatePost);
            const response = await axios.put(`${apiUrl}/posts/${updatePost._id}`, updatePost)
            if (response.data.success) {
                dispatch({ type: "UPDATE_POSTS", payload: response.data.post })
                return response.data
            }

        } catch (error) {
            console.log('Error deleting post');
        }
    }

    const postContextData = {
        getAllPost,
        postState,
        dispatch,
        showAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        setShowAddPostModal,
        addPost,
        deletePost,
        findPost,
        updatePost
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider

