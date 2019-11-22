<template>
  <div class="text-xs-center">
    <v-dialog
      :key="reloadDOM"
      max-width="700"
      v-model="dialogImageUpload"
      width="60%"
    >
      <template v-slot:activator="{ on }">
        <v-btn class="primary" v-on="on" dark fab small>
          <v-icon dark>
            cloud_upload
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline primary"
          primary-title
          style="border-radius: 0"
        >
          <v-icon class="px-2">
            cloud_upload
          </v-icon>
          Upload Media
        </v-card-title>
        <v-card-text class="pa-3">
          <v-tabs grow v-model="tab">
            <v-tab
              :key="item.name"
              class="grey lighten-2"
              v-for="item in media"
              @click="cleanTags()"
            >
              <v-icon class="px-2">
                {{ item.icon }}
              </v-icon>
              Upload {{ item.name }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item key="1">
              <v-card color=" ">
                <v-card-text>
                  <v-flex
                    class="text-xs-center text-sm-center text-md-center text-lg-center"
                    xs12
                  >
                    <img :src="imageUrl" v-if="imageUrl" width="100%" />
                    <v-text-field
                      @click="pickFile"
                      append-icon="attach_file"
                      hint="Note : Image width and height should be at least 600 x 600 pixels."
                      label="Upload Image"
                      outline
                      persistent-hint
                      v-model="imageName"
                    />
                    <input
                      @change="onFilePicked"
                      accept="image/*"
                      ref="image"
                      style="display: none"
                      type="file"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Image Description"
                      outline
                      v-model="description"
                    />
                    <v-card>
                      <v-card-actions class="grey darken-3  ">
                        <v-layout>
                          <v-flex class="center" xs12>
                            <v-text-field
                              append-icon="loyalty"
                              label="Add new Tag"
                              outline
                              v-model="newTag"
                            />
                          </v-flex>
                        </v-layout>
                      </v-card-actions>
                      <v-card-text class="grey lighten-1">
                        <v-chip
                          :key="key"
                          @input="tags.splice(key, 1)"
                          close
                          v-for="(tag, key) in tags"
                        >
                          <v-icon>loyalty</v-icon>
                          {{ tag }}
                        </v-chip>
                      </v-card-text>
                      <v-card-actions class="grey darken-3  ">
                        <v-spacer></v-spacer>

                        <v-btn
                          @click= "adTags(newTag)"
                          class="primary"
                          dark
                        >
                          <v-icon>add</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item key="2">
              <v-card color=" ">
                <v-card-text>
                  <v-flex
                    class="text-xs-center text-sm-center text-md-center text-lg-center"
                    xs12
                  >
                    <video
                      :src="internal_url"
                      controls
                      id="video-container"
                      ref="videoRef"
                      v-if="selectedFile"
                      width="100%"
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-switch
                      label="Upload Internal Video"
                      style="display: none"
                      v-model="urlInternal"
                    />

                    <div style="" v-if="urlInternal">
                      <v-text-field
                        @click="pickVideo"
                        append-icon="attach_file"
                        hint="Note : Video width and height should has a maximum resolution of 1920 x 1920 pixels."
                        label="Upload Video"
                        outline
                        persistent-hint
                        v-model="videoName"
                      />
                      <input
                        @change="onFileChanged"
                        accept="video/*"
                        id="video"
                        ref="video"
                        style="display: none"
                        type="file"
                      />
                    </div>
                    <div style="" v-else>
                      <v-text-field
                        @change="changeUrlType"
                        label="Upload External Video (url)"
                        outline
                        v-model="external_url"
                      />
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Video  Description"
                      outline
                      v-model="description"
                    />
                    <v-card>
                      <v-card-actions class="grey darken-3  ">
                        <v-layout>
                          <v-flex class="center" xs12>
                            <v-text-field
                                    append-icon="loyalty"
                                    label="Add new Tag"
                                    outline
                                    v-model="newTag"
                            />
                          </v-flex>
                        </v-layout>
                      </v-card-actions>
                      <v-card-text class="grey lighten-1">
                        <v-chip
                                :key="key"
                                @input="tags.splice(key, 1)"
                                close
                                v-for="(tag, key) in tags"
                        >
                          <v-icon>loyalty</v-icon>
                          {{ tag }}
                        </v-chip>
                      </v-card-text>
                      <v-card-actions class="grey darken-3  ">
                        <v-spacer></v-spacer>

                        <v-btn
                                @click= "adTags(newTag)"
                                class="primary"
                                dark
                        >
                          <v-icon>add</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn @click="saveMedia" class="primary">
            upload
          </v-btn>
          <v-btn @click="resetForm" color="primary">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "UploadImagesToLibrary",
  data() {
    return {
      media: [
        { name: "Images", icon: "add_photo_alternate" },
        { name: "Videos", icon: "video_call" }
      ],
      dialogImageUpload: false,
      newTag: "",
      imageName: "",
      videoName: "",
      imageUrl: "",
      externalURL: "",
      imageFile: "",
      tags: [],
      description: "",
      error: null,
      imgSize: {},
      tab: null,
      selectedFile: null,
      internal_url: null,
      external_url: null,
      reloadDOM: 0,
      urlInternal: 1,
      mediaFile: [],
      video: "",
      platforms: JSON.parse(localStorage.getItem("favoriteActivePlatforms"))
    };
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      this.mediaFile = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (parseInt(files[0].size) >= 12097152) {
          this.imageName = "Image should be least than 2MB";
          this.imageFile = "";
          this.imageUrl = "";
        } else {
          if (this.imageName.lastIndexOf(".") <= 0) {
            return;
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener("load", () => {
            this.imageUrl = fr.result;
            this.imageFile = files[0];
            this.imageValidator(fr);
          });
        }
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    imageValidator(fr) {
      var img = new Image();
      img.src = fr.result;
      const vue = this;
      img.onload = function() {
        if (img.width < 600 || img.height < 600) {
          vue.$swal({
            title: "Image should be at least 600px X 600px",
            text:
              "Actual image is only " + img.width + "px X " + img.height + "px",
            type: "error"
          });
          vue.imageName = "";
          vue.imageFile = "";
          vue.imageUrl = "";
        }
      };
    },
    changeUrlType() {
      this.internal_url = this.external_url;
      this.videoName = "New Video";
      this.selectedFile = true;
      this.reloadDOM++;
    },
    pickVideo() {
      this.$refs.video.click();
    },
    onFileChanged(event) {
      this.mediaFile = event.target.files;
      this.selectedFile = event.target.files[0];
      this.videoName = this.selectedFile.name;
      this.internal_url = URL.createObjectURL(event.target.files[0]);
      this.video = event.target.files[0];
    },
    saveMedia() {
      if (this.validator()) {
        const vue = this;
        vue.$store.dispatch("fetchLoadingStatus", true);
        if (this.tab === 0) {
          const imageUrl = this.imageUrl.split(",");
          if (this.mediaValidator(imageUrl[1])) {
            const image = {
              account: localStorage.getItem("accountID"),
              enabled: true,
              description: this.description,
              tags: this.tags,
              media_type: "image",
              platform: this.platforms
            };
            this.$store
              .dispatch("postMedia", image)
              .then(function(response) {
                vue.externalURL = response.data.data;
                const imageFile = {
                  url: vue.externalURL.presigned_url,
                  obj: vue.imageFile
                };

                vue.$store
                  .dispatch("putMedia", imageFile)
                  .then(function() {
                    vue.$store
                      .dispatch("fetchUploadStatus", vue.externalURL._id)
                      .then(function() {})
                      .catch(function(error) {
                        vue.$swal({
                          title: "Image Validation",
                          text: error,
                          type: "error"
                        });
                        vue.$store.dispatch("fetchLoadingStatus", false);
                        vue.userEditorDialog = false;
                      });
                  })
                  .catch(function(error) {
                    vue.$swal({
                      title: "Problem with creating new Media",
                      text: error,
                      type: "error"
                    });
                  })
                  .finally(function() {});
              })
              .then(() => {
                this.$store.dispatch("fetchImages");
                this.$store.dispatch("fetchImageTagsJson");
                this.resetForm();
                vue.$store.dispatch("fetchLoadingStatus", false);
                vue.userEditorDialog = false;
                vue.$swal({
                  title: "New Media!",
                  text: "Operation has been done!",
                  type: "success"
                });
              })
              .catch(function(error) {
                vue.$swal({
                  title: "Problem with creating new Media",
                  text: error,
                  type: "error"
                });
                vue.$store.dispatch("fetchLoadingStatus", false);
                vue.userEditorDialog = false;
              });
          }
        } else {
          if (this.mediaValidator(this.internal_url)) {
            const video = {
              account: localStorage.getItem("accountID"),
              enabled: true,
              description: this.description,
              tags: this.tags,
              media_type: "video",
              platform: this.platforms
            };
            this.$store
              .dispatch("postMedia", video)
              .then(function(response) {
                vue.externalURL = response.data.data;
                const imageFile = {
                  url: vue.externalURL.presigned_url,
                  obj: vue.video
                };
                vue.$store.dispatch("putMedia", imageFile).then(function() {
                  vue.$store
                    .dispatch("fetchUploadStatus", vue.externalURL._id)
                    .then(function() {})
                    .catch(function(error) {
                      vue.$swal({
                        title: "Image Validation",
                        text: error,
                        type: "error"
                      });
                      vue.$store.dispatch("fetchLoadingStatus", false);
                      vue.userEditorDialog = false;
                    });
                });
              })
              .then(() => {
                vue.$store.dispatch("fetchImages");
                vue.$store.dispatch("fetchImageTagsJson");
                vue.$store.dispatch("fetchLoadingStatus", false);
                vue.userEditorDialog = false;
                vue.resetForm();
                vue.$swal({
                  title: "New Media!",
                  text: "Operation has been done!",
                  type: "success"
                });
              })
              .catch(function(error) {
                vue.$swal({
                  title: "Problem with creating new Media",
                  text: error,
                  type: "error"
                });
                vue.$store.dispatch("fetchLoadingStatus", false);
                vue.userEditorDialog = false;
              });
          }
        }
      }
    },
    validator() {
      if (this.description === "") {
        this.$swal({
          title: "Description is required",
          type: "error"
        });
        return false;
      }
      if (this.tags.length === 0) {
        this.$swal({
          title: "Tags is required",
          type: "error"
        });
        return false;
      }
      return true;
    },
    mediaValidator(media) {
      if (media === "" || media === null) {
        this.$swal({
          title: "Media file is required",
          type: "error"
        });
        this.$store.dispatch("fetchLoadingStatus", false);
        return false;
      }
      return true;
    },
    resetForm() {
      this.tags = [];
      this.imageUrl = "";
      this.imageName = "";
      this.description = "";
      this.dialogImageUpload = false;
    },
    adTags(newTag){
      if(newTag !== '' && newTag.length > 3){
        this.tags.push(newTag)
      }else {
        this.$swal({
          title: 'Problem with creating new tags',
          text: 'You need a proper tag',
          type: 'error'
        });
      }
    },
    cleanTags(){
      this.tags = [];
      this.newTag = ''
    }
  }
};
</script>
