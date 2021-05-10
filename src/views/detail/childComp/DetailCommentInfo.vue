<template>
  <div class="comment-info-wrap" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-title">
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div class="comment-user-info">
      <span><img :src="commentInfo.user.avatar" alt="" class="avatar"></span>
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="comment-text">{{commentInfo.content}}</div>
    <div class="comment-goods-info">
      <span class="comment-time">{{commentInfo.created}}</span>
      <span>{{commentInfo.style}}</span>
    </div>
    <div class="comment-info-img" v-for="(img, index) in commentInfo.images" :key="index">
      <img :src="img" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .comment-info-wrap {
		padding: 0 8px;
		font-size: 14px;
		border-bottom: 4px solid #ececec;
  }

  .comment-info-wrap .comment-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ececec;
    padding: 10px 4px;
  }

  .comment-info-wrap .comment-user-info {
    padding: 10px 0;
  }

  .comment-info-wrap .comment-user-info .avatar {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 10px;
    vertical-align: middle;
  }

  .comment-info-wrap .comment-text {
    line-height: 20px;
  }

  .comment-info-wrap .comment-goods-info {
    color: #999;
    margin: 4px 0;
  }

  .comment-info-wrap .comment-goods-info .comment-time {
    margin-right: 10px;
  }

  .comment-info-wrap .comment-info-images img {
    display: flex;
    width: 60px;
    height: 60px;
    margin-right: 6px;
  }
</style>