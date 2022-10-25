<template>
  <div class="wrapper">
    <Loading v-model="loading"></Loading>
    <div class="header p-4 w-100">
      <div class="cols justify-content-space-between w-100 mb-4">
        <div class="cols">
          <img
            class="avatar"
            :src="
              $store.state.auth.user && $store.state.auth.user.user_avatar
                ? $store.state.auth.user.user_avatar
                : '/assets/profile.png'
            "
            alt=""
          />
          <div class="flex justify-content-center rows pl-3">
            <div class="color-text font-size-regular mb-1">
              Hello,
              {{
                $store.state.auth.user
                  ? $store.state.auth.user.user_name
                  : 'guest'
              }}
            </div>
            <div class="color-text">一般訪客</div>
            <Button
              v-if="
                $store.state.auth.user && $store.state.auth.user.user_is_admin
              "
              style="margin-top: 8px"
              size="mini"
              >切換至管理者介面</Button
            >
          </div>
        </div>
        <div class="flex cols align-items-center justify-content-center">
          <div class="home" @click="$router.push('/')">
            <Icon icon="home"></Icon>
          </div>
        </div>
      </div>
      <Notice
        v-if="lastReportedItemByMe"
        class="mb-4"
        title="你最近一次通報的遺失物"
        icon="android-studio"
        :message="
          lastReportedItemByMe.lost_item_name +
          ' | ' +
          lastReportedItemByMe.lost_item_color
        "
        :tips="
          lastReportedItemByMe.lost_item_location +
          ' | ' +
          new Date(lastReportedItemByMe.created_at).toLocaleString()
        "
      >
      </Notice>
    </div>

    <div class="items p-4">
      <div class="rows" v-if="mode == 'list'">
        <div class="cols">
          <div class="col-6">
            <Button
              class="itemsButton"
              size="small"
              @click="(_) => (asc = !asc)"
              ><Icon class="font-size-huge mr-2" icon="calendar"></Icon> 排序
            </Button>
          </div>
          <div class="col-6">
            <Button
              class="itemsButton"
              size="small"
              @click="(_) => (showSearch = !showSearch)"
              ><Icon class="font-size-huge mr-2" icon="magnify"></Icon> 搜尋
            </Button>
          </div>
        </div>
        <Input title="搜尋" v-model="search" v-if="showSearch"></Input>
        <div
          class="flex cols justify-content-space-between align-items-center mt-3"
        >
          <span class="font-size-regular">所有通報遺失物</span>
          <span v-if="false" class="font-size-mini color-secondary"
            >查看更多</span
          >
        </div>

        <div
          class="item flex justify-content-space-between align-items-center mt-3"
          v-for="item in items
            .filter((item) =>
              search
                ? (
                    item.lost_item_name +
                    item.lost_item_color +
                    item.lost_item_location
                  ).includes(search)
                : true
            )
            .sort((a, b) => (asc ? (a > b ? -1 : 1) : a > b ? 1 : -1))"
          :key="item.lost_item_id"
          @click="view(item)"
        >
          <div class="cols align-items-center">
            <div class="itemIcon mr-3">
              <Icon icon="android-studio"></Icon>
            </div>
            <div>
              <div class="itemTitle">
                {{ item.lost_item_name }} | {{ item.lost_item_color }}
              </div>
              <div class="itemSubTitle">
                {{ item.lost_item_location }} |
                {{ new Date(item.created_at).toLocaleString() }}
              </div>
            </div>
          </div>
          <div>
            <Icon class="arrowIcon" icon="chevron-right"></Icon>
          </div>
        </div>
        <div style="padding-top: 5rem"></div>
      </div>
      <div class="" v-if="mode == 'report'">
        <div class="reportUpload" @click="$refs.fileInput.click()">
          <img v-if="report.lost_item_image" :src="report.lost_item_image" />
          <span v-else>上傳遺失物圖片</span>
        </div>
        <input
          type="file"
          style="display: none"
          @change="fileSelected"
          ref="fileInput"
        />
        <Input
          title="物品名稱"
          titleColor="#000"
          backgroundColor="#fff"
          color="#000"
          class="mb-3 reportInput"
          v-model="report.lost_item_name"
        ></Input>
        <Input
          title="物品站點"
          titleColor="#000"
          backgroundColor="#fff"
          color="#000"
          class="mb-3 reportInput"
          v-model="report.lost_item_location"
        ></Input>
        <Input
          title="物品顏色"
          titleColor="#000"
          backgroundColor="#fff"
          color="#000"
          class="mb-3 reportInput"
          v-model="report.lost_item_color"
        ></Input>
        <Input
          title="通報時間 (依伺服器時間為準)"
          titleColor="#000"
          backgroundColor="#fff"
          color="#000"
          class="mb-3 reportInput"
          type="datetime-local"
          v-model="report.reportTime"
        ></Input>

        <Button textColor="#fff" color="#eca468" @click="submit">
          確認通報</Button
        >
        <Button
          textColor="#fff"
          color="#eca468"
          style="margin-top: 8px"
          @click="(_) => (mode = 'list')"
        >
          返回</Button
        >
      </div>
      <div v-if="mode == 'view'">
        <img class="viewItemImage" :src="viewItem.lost_item_image" />
        <div class="viewItemContent">
          <div class="viewItemContentTitle">物品名稱</div>
          <div class="viewItemContentText">{{ viewItem.lost_item_name }}</div>
        </div>
        <div class="viewItemContent">
          <div class="viewItemContentTitle">物品顏色</div>
          <div class="viewItemContentText">{{ viewItem.lost_item_color }}</div>
        </div>
        <div class="viewItemContent">
          <div class="viewItemContentTitle">物品站點</div>
          <div class="viewItemContentText">
            {{ viewItem.lost_item_location }}
          </div>
        </div>
        <div class="viewItemContent">
          <div class="viewItemContentTitle">通報時間</div>
          <div class="viewItemContentText">
            {{ new Date(viewItem.created_at).toLocaleString() }}
          </div>
        </div>

        <Button
          textColor="#fff"
          color="#eca468"
          style="margin-top: 8px"
          @click="(_) => (mode = 'list')"
        >
          返回</Button
        >
      </div>
    </div>

    <Button
      class="reportButton"
      textColor="#fff"
      color="#eca468"
      v-if="mode == 'list' && this.$store.state.auth.user"
      @click="mode = 'report'"
    >
      <Icon class="reportIcon" icon="bullhorn"></Icon>
      我要通報</Button
    >
  </div>
</template>

<script>
import config from '../config'

import Icon from '~/components/Elements/Icon.vue'
import Loading from '~/components/Elements/Loading.vue'
export default {
  components: { Icon },
  data() {
    return {
      mode: 'list',
      items: [],
      loading: false,
      asc: false,
      showSearch: false,
      search: '',

      viewItem: null,
      lastReportedItemByMe: null,
      report: {
        lost_item_name: '',
        lost_item_image: null,
        lost_item_location: '',
        lost_item_color: '',
        itemImageFile: null,
        reportTime: new Date(
          new Date().getTime() + new Date().getTimezoneOffset() * -1 * 60 * 1000
        )
          .toISOString()
          .slice(0, 16),
      },
    }
  },
  mounted() {
    this.getItems()
  },
  methods: {
    async getItems() {
      this.loading = true
      await this.$axios
        .get(`/api/lostItems`)
        .then((response) => {
          this.items = response.data.items
          if (this.$store.state.auth.user) {
            this.$set(
              this,
              'lastReportedItemByMe',
              this.items.find(
                (item) => item.created_by == this.$store.state.auth.user.user_id
              )
            )
          }
        })
        .catch((err) => {
          console.log(err)
        })
      this.loading = false
    },
    async fileSelected(event) {
      if (event.target.files[0] == undefined) return
      this.loading = true
      this.report.itemImageFile = event.target.files[0]
      this.report.lost_item_image = await this.uploadImage(
        this.report.itemImageFile
      )
      let itemInfo = await this.getItemInfo(this.report.lost_item_image)
      this.report.lost_item_color = itemInfo.item_color
      this.report.lost_item_name = itemInfo.item_name
      this.loading = false
    },
    async uploadImage(file) {
      var formData = new FormData()
      formData.append('image', file)

      return this.$axios
        .post('https://api.imgur.com/3/image', formData, {
          headers: {
            Authorization: 'Client-ID ' + config.imgur.clientID,
          },
        })
        .then((response) => {
          return response.data.data.link
        })
        .catch((error) => {
          alert('上傳失敗，請稍後再試')
          console.log(error)
          return null
        })
    },
    async getItemInfo(url) {
      return this.$axios
        .get('/objectDetection?img_url=' + url)
        .then((response) => {
          return response.data
        })
        .catch((error) => {
          return {
            item_name: '',
            item_color: '',
          }
        })
    },
    async submit() {
      this.loading = true
      await this.$axios
        .post(`/api/lostItem`, this.report)
        .then((response) => {
          this.$snackbar({ message: '通報成功' })
          this.mode = 'list'
          this.getItems()
        })
        .catch((err) => {
          this.$snackbar({
            message: '通報失敗 錯誤:' + err.response.data.message,
          })
        })
      this.loading = false
    },
    view(item) {
      this.mode = 'view'
      this.viewItem = item
    },
  },
  layout: 'default-noPadding',
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
}
.avatar {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 50%;
}
.home {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  font-size: 2rem;
  background: #fff;
  color: #00e88e;
  display: flex;
  justify-content: center;
  align-items: center;
}
.items {
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 32px 32px 0px 0px;
  overflow: auto;
}
.itemsButton {
  justify-content: flex-start !important;
  align-items: center;
  margin: 0.5rem;
  color: #fff !important  ;
  border-radius: 32px;
}

.item {
  padding: 1rem;
  border: 2px solid #444444;
  border-radius: 24px;
}
.itemIcon {
  width: 3rem;
  height: 3rem;
  border-radius: 4px;
  font-size: 2rem;
  background: #00e88e;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.itemTitle {
  font-size: 1.2rem;
  font-weight: bold;
}
.itemSubTitle {
  margin-top: 0.2rem;
  font-size: 0.8rem;
}
.arrowIcon {
  font-size: 2rem;
}
.reportIcon {
  font-size: 2.4rem;
}
.reportButton {
  width: 90%;
  bottom: 16px;
  left: 5%;

  box-sizing: border-box;
  position: fixed;
  padding: 0;

  display: flex;
  align-items: center;
}
.reportInput >>> input {
  margin-top: 1rem;
  border: 1px #000 solid;
}
.reportUpload {
  width: 100%;
  height: 8rem;
  background: #66f2bb;
  color: #fff;
  border-radius: 16px;

  margin-bottom: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;
}
.reportUpload > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.viewItemImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}
.viewItemContent {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.viewItemContentTitle {
  font-size: 1.2rem;
  font-weight: bold;
}
.viewItemContentText {
  margin-top: 0.2rem;
  font-size: 0.8rem;
}
</style>
