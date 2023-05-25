import express from  'express'
import {getPosts,createPost,updatePost,deletePost,updateLikePost, getPostsBySearch,getPost} from '../controllers/posts.js'
import auth from '../middleware/Auth.js'
const router  = express.Router();

router.get('/',getPosts);
router.get('/search',getPostsBySearch);
router.get('/:id',getPost);
router.post('/',auth,createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',auth,updateLikePost);
export default router ;