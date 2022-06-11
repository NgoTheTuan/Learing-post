import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'


const UpdatePostModal = () => {

    const { postState: { post }, dispatch, showUpdatePostModal, setShowUpdatePostModal, updatePost } = useContext(PostContext)

    //State 
    const [updatedPost, setUpdatedPost] = useState(post)

    const { title, description, url, status } = updatedPost

    const onChangeUpdatePostForm = event => setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })


    const closeDialog = () => {
        dispatch({ type: 'RESET_POST', payload: null })
        setShowUpdatePostModal(false)
    }

    const onSubmit = async (event) => {
        event.preventDefault()

        try {
            console.log('tuan');
            const { success, message } = await updatePost(updatedPost)
            closeDialog()
        } catch (error) {

        }
    }


    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Update Post</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeUpdatePostForm}

                        />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={onChangeUpdatePostForm}

                        />
                        <Form.Text id='title-help' muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Youtube Tutorial URL'
                            name='url'
                            value={url}
                            onChange={onChangeUpdatePostForm}

                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as='select'
                            value={status}
                            name='status'
                            onChange={onChangeUpdatePostForm}
                        >
                            <option value='TO LEARN'>TO LEARN</option>
                            <option value='LEARNING'>LEARNING</option>
                            <option value='LEARNED'>LEARNED</option>
                        </Form.Control>
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        LearnIt!
                    </Button>
                </Modal.Footer>

            </Form>
        </Modal>
    )
}

export default UpdatePostModal