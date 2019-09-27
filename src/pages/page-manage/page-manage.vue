<template>
  <div class="page-manage">
    <base-tabs :data="tabList"
               :value.sync="pageType"
               valueKey="type"
               tabAlign="left"
               @change="tabChange"
    ></base-tabs>
    <div class="content-wrap">
      <div class="content-detail">
        <!--礼品馆-->
        <template v-if="pageType === 'gift_index'">
          <gift-content :bannerList="bannerList"
                        :navigationList="navigationList"
                        :hotList="hotList"
                        :recommendList="recommendList"
                        :industryRecommendList="industryRecommendList"
                        :cmsType.sync="type"
                        :cmsList="moduleList"
                        :hotBanner="hotModuleData.detail.image_url"
                        :recommendBanner="recommendModuleData.detail.image_url"
          ></gift-content>
          <div class="edit-modular">
            <div class="box">
              <div class="small">
                <div v-if="type === 'banner'" class="banner">
                  <div class="content-header">
                    <div class="content-title">首图banner</div>
                    <div class="content-sub">(最多添加10个banner，鼠标拖拽调整广告顺序)</div>
                  </div>
                  <slick-list v-model="bannerList" :distance="30" lockAxis="y">
                    <slick-item v-for="(item, index) in bannerList" :key="index" :index="index">
                      <div class="advertisement-msg" @click="getIndex(index)">
                        <upload
                          :data.sync="item.detail.image_url"
                          :multiple="false"
                          :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                          imgStyle="width: 100px; height: 100px"
                          :indicatorPosition="false"
                          :isShowDel="false"
                          :isChange="true"
                          firstTag="更换图片"
                          @delete="deleteGoodsMainPic()"
                          @successImage="successImage"
                        ></upload>

                        <!--@click=""-->
                        <div class="advertisement-link">
                          <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)"><span class="add-icon"></span>添加链接</base-button>
                          <p class="goods-title">{{(item.style === 3004 || item.style === 3005) ? item.detail.url : item.detail.title}}</p>
                        </div>
                        <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                      </div>
                    </slick-item>
                  </slick-list>
                </div>
                <div v-if="type === 'navigation'" class="navigation">
                  <div class="content-header">
                    <div class="content-title">类目导航</div>
                    <div class="content-sub">(最多添加5个类目，鼠标拖拽调整类目顺序)</div>
                  </div>
                  <slick-list v-model="navigationList" :distance="30" lockAxis="y">
                    <slick-item v-for="(item, index) in navigationList" :key="index" :index="index">
                      <div class="advertisement-msg" @click="getIndex(index)">
                        <upload
                          :data.sync="item.detail.image_url"
                          :multiple="false"
                          :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                          imgStyle="width: 100px; height: 100px"
                          :indicatorPosition="false"
                          :isShowDel="false"
                          :isChange="true"
                          firstTag="更换图片"
                          @delete="deleteGoodsMainPic()"
                          @successImage="successImage"
                        ></upload>

                        <!--@click=""-->
                        <div class="advertisement-link column">
                          <div class="top-box">
                            <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)"><span class="add-icon"></span>添加链接</base-button>
                            <div v-if="(item.style === 3004 || item.style === 3005) && item.detail.url" class="goods-title">{{item.detail.url}}</div>
                          </div>
                          <base-input
                            :value="item.detail.title"
                            class="brand-title"
                            width="260"
                            height="44"
                            placeholder="请输入品牌名称"
                            limit="4"
                            @input="changeBrandTitle($event, index)"
                          ></base-input>
                        </div>
                        <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                      </div>
                    </slick-item>
                  </slick-list>
                </div>
                <div v-if="type === 'hot'" class="hot">
                  <div class="content-header">
                    <div class="content-title">今日爆款</div>
                    <div class="content-sub">(最多添加20个商品，鼠标拖拽调整商品顺序)</div>
                  </div>
                  <div class="sub-title">Banner图</div>
                  <div class="advertisement-msg">
                    <upload
                      :data.sync="moduleDetail.detail.image_url"
                      :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                      imgStyle="width: 100px; height: 100px"
                      :isShowDel="false"
                      :isChange="true"
                      firstTag="更换图片"
                      @delete="deleteGoodsMainPic()"
                      @successImage="successBanner"
                    ></upload>
                  </div>
                  <div class="content-header sub-header">
                    <div class="content-title">商品</div>
                  </div>
                  <div class="source-con">
                    <div class="source-title">商品来源</div>
                    <radio v-model="selectSource" :list="sourceList" @change="_selectSource"></radio>
                  </div>
                  <div v-if="selectSource===0" class="groups-con">
                    <base-button plain buttonStyle="border-radius: 2px;height: 28px" @click="showGroupsModal">选择分组</base-button>
                    <template v-if="moduleDetail.detail.title">
                      <div class="groups-val">{{moduleDetail.detail.title}}</div>
                    </template>
                  </div>
                  <!--今日爆款 商品分组-->
                  <div v-if="selectSource===0">
                    <div v-for="(item, index) in groupsGoodsList" :key="index">
                      <div v-if="item.status===1" class="advertisement-msg" @click="getIndex(index)">
                        <img v-if="item.goods_cover_image" :src="item.goods_cover_image" alt="" class="cate-image">
                        <div class="advertisement-link">
                          <p class="goods-title margin-left-0">{{item.name}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--今日爆款 商品-->
                  <slick-list v-if="selectSource===1" v-model="hotList" :distance="30" lockAxis="y">
                    <slick-item v-for="(item, index) in hotList" :key="index" :index="index">
                      <div class="advertisement-msg" @click="getIndex(index)">
                        <upload
                          :data.sync="item.detail.image_url"
                          :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                          imgStyle="width: 100px; height: 100px"
                          :isShowDel="false"
                          :isChange="true"
                          firstTag="更换图片"
                          @delete="deleteGoodsMainPic()"
                          @successImage="successImage"
                        ></upload>
                        <div class="advertisement-link">
                          <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)"><span class="add-icon"></span>选择商品</base-button>
                          <p class="goods-title">{{item.detail.title}}</p>
                        </div>
                        <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                      </div>
                    </slick-item>
                  </slick-list>
                </div>
                <div v-if="type === 'recommend'" class="goods">
                  <div class="content-header">
                    <div class="content-title">精品推荐</div>
                    <div class="content-sub">(最多添加20个商品，鼠标拖拽调整商品顺序)</div>
                  </div>
                  <div class="sub-title">Banner图</div>
                  <div class="advertisement-msg">
                    <upload
                      :data.sync="moduleDetail.detail.image_url"
                      :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                      imgStyle="width: 100px; height: 100px"
                      :isShowDel="false"
                      :isChange="true"
                      firstTag="更换图片"
                      @delete="deleteGoodsMainPic()"
                      @successImage="successBanner"
                    ></upload>
                  </div>
                  <div class="content-header sub-header">
                    <div class="content-title">商品</div>
                  </div>
                  <div class="source-con">
                    <div class="source-title">商品来源</div>
                    <radio v-model="selectSource" :list="sourceList" @change="_selectSource"></radio>
                  </div>
                  <div v-if="selectSource===0" class="groups-con">
                    <base-button plain buttonStyle="border-radius: 2px;height: 28px" @click="showGroupsModal">选择分组</base-button>
                    <template v-if="moduleDetail.detail.title">
                      <div class="groups-val">{{moduleDetail.detail.title}}</div>
                    </template>
                  </div>
                  <!--精品推荐 商品分组-->
                  <div v-if="selectSource===0">
                    <div v-for="(item, index) in groupsGoodsList" :key="index">
                      <div v-if="item.status===1" class="advertisement-msg" @click="getIndex(index)">
                        <img v-if="item.goods_cover_image" :src="item.goods_cover_image" alt="" class="cate-image">
                        <div class="advertisement-link">
                          <p class="goods-title margin-left-0">{{item.name}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <slick-list v-if="selectSource===1" v-model="recommendList" :distance="30" lockAxis="y">
                    <slick-item v-for="(item, index) in recommendList" :key="index" :index="index">
                      <div class="advertisement-msg" @click="getIndex(index)">
                        <upload
                          :data.sync="item.detail.image_url"
                          :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                          imgStyle="width: 100px; height: 100px"
                          :isShowDel="false"
                          :isChange="true"
                          firstTag="更换图片"
                          @delete="deleteGoodsMainPic()"
                          @successImage="successImage"
                        ></upload>
                        <div class="advertisement-link">
                          <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)"><span class="add-icon"></span>选择商品</base-button>
                          <p class="goods-title">{{item.detail.title}}</p>
                        </div>
                        <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                      </div>
                    </slick-item>
                  </slick-list>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!--品牌馆-->
        <template v-if="pageType === 'brand_index'">
          <brand-content
            :brandList="brandList"
            :bannerList="bannerList"
            :wallList="wallList"
            :cmsType.sync="type"
            :cmsList="moduleList"
            :bestList="bestList"
          ></brand-content>
          <div class="edit-modular">
            <div class="box">
              <div class="small">
                <div v-if="type === 'banner'" class="banner">
                  <div class="content-header">
                    <div class="content-title">轮播图</div>
                    <div class="content-sub">(最多添加10个banner，鼠标拖拽调整广告顺序)</div>
                  </div>
                  <slick-list v-model="bannerList" :distance="30" lockAxis="y">
                    <slick-item v-for="(item, index) in bannerList" :key="index" :index="index">
                      <div class="advertisement-msg" @click="getIndex(index)">
                        <upload
                          :data.sync="item.detail.image_url"
                          :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                          imgStyle="width: 100px; height: 100px"
                          :isShowDel="false"
                          :isChange="true"
                          firstTag="更换图片"
                          @delete="deleteGoodsMainPic()"
                          @successImage="successImage"
                        ></upload>
                        <div class="advertisement-link">
                          <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)"><span class="add-icon"></span>添加链接</base-button>
                          <p class="goods-title">{{(item.style === 3004 || item.style === 3005) ? item.detail.url : item.detail.title}}</p>
                        </div>
                        <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                      </div>
                    </slick-item>
                  </slick-list>
                </div>
                <div v-if="type === 'wall'" class="wall">
                  <div class="content-header">
                    <div class="content-title">品牌导航</div>
                    <div class="content-sub">(最多添加10个品牌，鼠标拖拽调整品牌顺序)</div>
                  </div>
                  <slick-list v-model="wallList" :distance="30" lockAxis="y">
                    <slick-item v-for="(item, index) in wallList" :key="index" :index="index">
                      <div class="advertisement-msg" @click="getIndex(index)">
                        <div class="img-box">
                          <img v-if="item.detail.logo_image_url||item.detail.image_url" :src="item.detail.logo_image_url||item.detail.image_url" alt="" class="cate-image">
                        </div>
                        <!--@click=""-->
                        <div class="advertisement-link column">
                          <div class="top-box">
                            <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)">
                              <span class="add-icon"></span>添加品牌
                            </base-button>
                            <div v-if="(item.style === 3004 || item.style === 3005) && item.detail.url" class="goods-title">{{item.detail.url}}</div>
                          </div>
                          <base-input
                            :value="item.detail.title"
                            class="brand-title"
                            width="260"
                            height="44"
                            placeholder="请输入品牌名称"
                            limit="4"
                            @input="changeBrandTitle($event, index)"
                          ></base-input>
                        </div>
                        <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                      </div>
                    </slick-item>
                  </slick-list>
                </div>
                <div v-if="type === 'brand'" class="brands">
                  <div class="content-header">
                    <div class="content-title">品牌动态</div>
                    <div class="content-sub">(最多添加20个品牌，鼠标拖拽调整品牌顺序)</div>
                  </div>
                  <slick-list v-model="brandList" :distance="30" lockAxis="y">
                    <slick-item v-for="(item, index) in brandList" :key="index" :index="index">
                      <div class="advertisement-msg" @click="getIndex(index)">
                        <upload
                          :data.sync="item.detail.image_url"
                          :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                          imgStyle="width: 100px; height: 100px"
                          :isShowDel="false"
                          :isChange="true"
                          firstTag="更换图片"
                          @delete="deleteGoodsMainPic()"
                          @successImage="successImage"
                        ></upload>
                        <div class="advertisement-link">
                          <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)">
                            <span class="add-icon"></span>选择链接
                          </base-button>
                          <p class="goods-title">{{item.detail.title}}</p>
                        </div>
                        <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                      </div>
                    </slick-item>
                  </slick-list>
                </div>
                <div v-if="type === 'best'" class="brands">
                  <div class="content-header">
                    <div class="content-title">精品推荐</div>
                    <div class="content-sub">(最多添加20商品，鼠标拖拽调整商品顺序)</div>
                  </div>
                  <div class="source-con">
                    <div class="source-title">商品来源</div>
                    <radio v-model="selectSource" :list="sourceList" @change="_selectSource"></radio>
                  </div>
                  <div v-if="selectSource===0" class="groups-con">
                    <base-button plain buttonStyle="border-radius: 2px;height: 28px" @click="showGroupsModal">选择分组</base-button>
                    <template v-if="moduleDetail.detail.title">
                      <div class="groups-val">{{moduleDetail.detail.title}}</div>
                    </template>
                  </div>
                  <!--精品推荐 商品分组-->
                  <div v-if="selectSource===0">
                    <div v-for="(item, index) in groupsGoodsList" :key="index">
                      <div v-if="item.status===1" class="advertisement-msg" @click="getIndex(index)">
                        <img v-if="item.goods_cover_image" :src="item.goods_cover_image" alt="" class="cate-image">
                        <div class="advertisement-link">
                          <p class="goods-title margin-left-0">{{item.name}}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <slick-list v-if="selectSource===1" v-model="bestList" :distance="30" lockAxis="y">
                    <slick-item v-for="(item, index) in bestList" :key="index" :index="index">
                      <div class="advertisement-msg" @click="getIndex(index)">
                        <upload
                          :data.sync="item.detail.image_url"
                          :addStyle="`margin:0 20px 0 0;width:100px;height:100px;background-image: url('${addImage}')`"
                          imgStyle="width: 100px; height: 100px"
                          :isShowDel="false"
                          :isChange="true"
                          firstTag="更换图片"
                          @delete="deleteGoodsMainPic()"
                          @successImage="successImage"
                        ></upload>
                        <div class="advertisement-link">
                          <base-button plain buttonStyle="width: 108px" @click="showModalBox(index, item.object_id)"><span class="add-icon"></span>选择商品</base-button>
                          <p class="goods-title">{{item.detail.title}}</p>
                        </div>
                        <p class="use list-operation" @click="showConfirm(item.id, index)">删除</p>
                      </div>
                    </slick-item>
                  </slick-list>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!--弹窗-->
        <base-modal
          ref="goods"
          class="page-modal"
          width="1000"
          :visible.sync="showModal"
          :submitBefore="justifyForm"
          @cancel="hideGoods"
          @submit="miniGoods"
        >
          <div class="model">
            <div class="shade-header">
              <div class="shade-tab-type">
                <div v-if="typeList.length===1" :class="{'shade-tab-item-active': tabIndex === 0}" class="shade-tab-item hand">
                  {{outLink===3011?'商品分组':typeList[0].title}}
                </div>
                <template v-else>
                  <div v-for="(items, index) in typeList" :key="index" :class="{'shade-tab-item-active': tabIndex === index}" class="shade-tab-item hand" @click="setLinkType(index, $event)">
                    {{items.title}}
                  </div>
                </template>
                <div v-if="showModalLine" class="line" :style="{left: left, width: lineWidth}"></div>
              </div>
              <span class="close hand" @click="hideGoods"></span>
            </div>
            <!--商品-->
            <div
              v-if="outLink === 3002"
              class="good-modal"
            >
              <div class="shade-tab">
                <base-select
                  v-if="pageType==='gift_index'"
                  placeholder="请选择分类"
                  :data="classList"
                  :width="218"
                  valueKey="id"
                  labelKey="name"
                  :value.sync="categoryId"
                ></base-select>
                <base-select
                  v-if="pageType==='brand_index'"
                  placeholder="请选择品牌"
                  :data="filterBrandList"
                  :width="218"
                  valueKey="id"
                  labelKey="name"
                  :value.sync="brandId"
                ></base-select>
                <base-search
                  v-model="keyword"
                  :width="244"
                  placeholder="请输入商品名称"
                  @search="searchGoods"
                ></base-search>
              </div>
              <div class="goods-content goods">
                <div class="goods-item goods-header">
                  <div class="goods-text"></div>
                  <div class="goods-text">商品名称</div>
                  <div class="goods-text">零售价</div>
                  <div class="goods-text">库存</div>
                </div>
                <div class="goods-list">
                  <div v-for="(item, index) in choiceGoods" :key="index" class="goods-item">
                    <div class="goods-text">
                      <div class="select-icon hand" :class="{'select-icon-active': showSelectIndex === index}" @click="selectGoods(item, index)">
                        <span class="after"></span>
                      </div>
                    </div>
                    <div class="goods-text goods-msg">
                      <img :src="item.goods_cover_image" alt="" class="goods-img">
                      <div class="goods-name">{{item.name}}</div>
                    </div>
                    <div class="goods-text">¥{{item.price}}</div>
                    <div class="goods-text">{{item.saleable}}</div>
                  </div>
                  <!--select-icon-active-->
                </div>
              </div>
              <div v-if="total > 0" class="page-box">
                <base-pagination ref="pages" :currentPage.sync="goodsPage" :total="total" :pageSize="6"></base-pagination>
              </div>
            </div>
            <!--商品分类-->
            <div v-if="outLink === 3003" class="goods-cate">
              <div v-for="(goods, goodsIdx) in goodsCate" :key="goodsIdx" class="goods_cate-item">
                <div class="select-icon hand" :class="{'select-icon-active': showSelectIndex === goodsIdx}" @click="selectGoods(goods, goodsIdx)">
                  <span class="after"></span>
                </div>
                <div class="shade-goods-msg">
                  <div class="shade-goods-name">{{goods.name}}</div>
                  <div class="shade-goods-num">{{goods.goods_count}}个商品</div>
                </div>
              </div>
            </div>
            <!--小程序链接-->
            <div v-if="outLink === 3005" class="link-text">
              <textarea v-model="miniLink" class="link-text-box" placeholder="请输入小程序链接"></textarea>
            </div>
            <!--H5链接-->
            <div v-if="outLink === 3004" class="link-text">
              <textarea v-model="outHtml" class="link-text-box" placeholder="请输入H5链接"></textarea>
            </div>
            <!--文章列表-->
            <div v-if="outLink === 3006" class="goods-modal">
              <div class="shade-tab">
                <base-search
                  v-model="keyword"
                  :width="244"
                  :isShowTip="false"
                  boxStyle="margin-left: 0"
                  placeholder="请输入内容文章标题"
                  @search="searchArticle"
                ></base-search>
              </div>
              <div class="goods-content article">
                <div class="goods-item goods-header">
                  <div class="goods-text"></div>
                  <div class="goods-text">文章封面</div>
                  <div class="goods-text">标题</div>
                </div>
                <div class="goods-list">
                  <div v-for="(item, index) in articleArr" :key="index" class="goods-item">
                    <div class="goods-text">
                      <div class="select-icon hand" :class="{'select-icon-active': showSelectIndex === index}" @click="selectGoods(item, index)">
                        <span class="after"></span>
                      </div>
                    </div>
                    <div class="goods-text goods-msg">
                      <img :src="item.cover_image_url" alt="" class="goods-img">
                    </div>
                    <div class="goods-text">{{item.title}}</div>
                  </div>
                </div>
              </div>
              <div v-if="total > 0" class="page-box">
                <base-pagination ref="pages" :currentPage.sync="goodsPage" :total="total" :pageSize="6"></base-pagination>
              </div>
            </div>
            <!--品牌列表-->
            <div v-if="outLink === 3009 || outLink === 3010" class="goods-modal">
              <div class="shade-tab">
                <base-search
                  v-model="keyword"
                  :width="244"
                  :isShowTip="false"
                  boxStyle="margin-left: 0"
                  placeholder="请输入品牌名称"
                  @search="searchBrand"
                ></base-search>
              </div>
              <div class="goods-content">
                <div class="goods-item goods-header">
                  <div class="goods-text"></div>
                  <div class="goods-text">品牌logo</div>
                  <div class="goods-text">品牌名称</div>
                </div>
                <div class="goods-list">
                  <div v-for="(item, index) in brandArr" :key="index" class="goods-item">
                    <div class="goods-text">
                      <div class="select-icon hand" :class="{'select-icon-active': showSelectIndex === index}" @click="selectGoods(item, index)">
                        <span class="after"></span>
                      </div>
                    </div>
                    <div class="goods-text goods-msg">
                      <img :src="item.logo_image_url" alt="" class="goods-img">
                    </div>
                    <div class="goods-text">{{item.name}}</div>
                  </div>
                </div>
              </div>
              <div v-if="total > 0" class="page-box">
                <base-pagination ref="pages" :currentPage.sync="goodsPage" :total="total" :pageSize="6"></base-pagination>
              </div>
            </div>
            <!--商品分组-->
            <div v-if="outLink === 3011">
              <div class="shade-tab">
                <base-search
                  v-model="keyword"
                  :width="244"
                  :isShowTip="false"
                  boxStyle="margin-left: 0"
                  placeholder="分组名称"
                  @search="searchGroups"
                ></base-search>
              </div>
              <div class="groups-header">
                <div class="goods_cate-item">
                  <div class="shade-goods-msg">
                    <div class="shade-goods-name">分组名称</div>
                    <div class="shade-goods-num">商品数量</div>
                  </div>
                </div>
              </div>
              <div class="groups-content">
                <div v-for="(groups, groupsIdx) in groupsList" :key="groupsIdx" class="goods_cate-item">
                  <div class="select-icon hand" :class="{'select-icon-active': showSelectIndex === groupsIdx}" @click="selectGoods(groups, groupsIdx)">
                    <span class="after"></span>
                  </div>
                  <div class="shade-goods-msg">
                    <div class="shade-goods-name hand" @click="selectGoods(groups, groupsIdx)">{{groups.name}}</div>
                    <div class="shade-goods-num">{{groups.goods_num}}个商品</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </base-modal>

        <base-footer :isSeize="false">
          <base-button v-if="selectSource===1||outLink!==3011" plain @click="newCms">新建</base-button>
          <base-button type="primary" @click="submitBtn">保存</base-button>
        </base-footer>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import API from '@api'
  import GiftContent from './gift-content/gift-content'
  import BrandContent from './brand-content/brand-content'
  import {SlickList, SlickItem, HandleDirective} from 'vue-slicksort'
  import Upload from '@components/zb-upload/zb-upload.vue'
  import Radio from "../../components/zb-radio/zb-radio"

  const PAGE_NAME = 'CMS_MANAGER'
  const TITLE = '页面管理'
  const ADD_IMAGE = require('./pic-add_img@2x.png')
  // 弹窗菜单栏
  const TYPE_LIST = [{title: '文章', status: 3006}, {title: '商品', status: 3002}, {title: '小程序链接', status: 3005}, {title: 'H5链接', status: 3004}]
  const NAV_TYPE = [{title: '商品分类', status: 3003}, {title: '小程序链接', status: 3005}, {title: 'H5链接', status: 3004}]
  const HOT_TYPE = [{title: '商品', status: 3002}]
  const GOODS_TYPE = [{title: '商品', status: 3002}]
  const BRANDS_TYPE = [{title: '品牌列表', status: 3009}, {title: '商品', status: 3002}]
  const BEST_TYPE = [{title: '商品', status: 3002}]
  const WALL_TYPE = [{title: '商品品牌', status: 3010}, {title: '小程序链接', status: 3005}, {title: 'H5链接', status: 3004}]

  // 初始模块数据
  const TEMPLATE_OBJ = {
    detail: {
      object_id: '',
      url: '',
      title: '',
      image_id: '',
      add_icon: ADD_IMAGE,
      brand: {}
    },
    style: ''
  }

  // 模板对象
  export default {
    name: PAGE_NAME,
    directives: {handle: HandleDirective},
    components: {
      GiftContent,
      BrandContent,
      SlickList,
      SlickItem,
      Upload,
      Radio
    },
    page: {
      title: TITLE
    },
    data() {
      return {
        tabList: [{text: '礼品馆', type: 'gift_index'}, {text: '品牌馆', type: 'brand_index'}],
        lineWidth: 32,
        left: 0,
        addImage: ADD_IMAGE,
        navigationList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))], // 导航初始数据
        hotList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))],  // 今日爆款初始数据
        recommendList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))], // 精品推荐初始数据
        bannerList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))], // 礼品馆首图banner
        brandList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))], // 品牌推荐
        industryRecommendList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))], // 行业推荐初始数据
        bestList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))], // 精品推荐初始数据
        wallList: [JSON.parse(JSON.stringify(TEMPLATE_OBJ))], // 品牌墙初始数据
        type: 'banner',
        cmsIndex: 0,
        showModal: false,
        tabIndex: 0,
        typeList: TYPE_LIST,
        moduleList: [],
        showSelectIndex: -1,
        goodsPage: 1,
        total: 0,
        miniLink: '',
        outHtml: '',
        choiceGoods: [], // 商品列表
        goodsCate: [], // 分类列表
        articleArr: [], // 文章列表
        brandArr: [], // 品牌列表
        classList: [], // 分类下拉
        filterBrandList: [], // 商品列表-品牌筛选
        showCateIndex: -1,
        bannerIndex: 0,
        choicePage: 1,
        keyword: '',
        categoryId: '',
        brandId: '',
        outLink: 3002,
        delId: '',
        delIndex: -1,
        confirm: false,
        pageType: 'gift_index',
        goodsId: '',
        articleId: '',
        currentItem: '',
        selectSource: 0,
        groupsList: [], // 商品分组
        groupsGoodsList: [],
        moduleDetail: {},
        hotModuleData: {detail:{image_url:''}},
        recommendModuleData: {detail:{image_url:''}},
        sourceList: [{label: '商品分组', id: 0}, {label: '商品', id: 1}]
      }
    },
    computed: {
      dataName() {
        let name = `${this.type}List`
        return name
      },
      showModalLine() {
        return this.typeList.length > 1
      }
    },
    watch: {
      goodsPage() {
        this.requestHandle()
      },
      categoryId() {
        this._getGoodsList()
      },
      brandId() {
        this._getGoodsList()
      },
      type(news) {
        this.currentItem = ''
        this.showSelectIndex = -1
        switch (news) {
        case 'navigation':
          this.typeList = NAV_TYPE
          break
        case 'hot':
          this.typeList = HOT_TYPE
          break
        case 'recommend':
          this.typeList = GOODS_TYPE
          break
        case 'banner':
          this.typeList = TYPE_LIST
          break
        case 'brand':
          this.typeList = BRANDS_TYPE
          break
        case 'best':
          this.typeList = BEST_TYPE
          break
        case 'wall':
          this.typeList = WALL_TYPE
          break
        default:
          break
        }
        this.initData()
        // 遍历找出当前模块
        this.moduleList.forEach((item, index) => {
          if (item.code.includes(news) && item.code !== 'industry_recommend') {
            this.moduleDetail = item
            // 模块没有detail的，初始化detail
            if (Array.isArray(item.detail) && item.detail.length === 0) {
              item.detail = {image_url:'',image_id:'',object_id:'',source:'',title:''}
            }
            this.outLink = item.detail.source || this.typeList[0].status
            this.selectSource = item.detail.source === 3011 ? 0 : 1// 根据保存的来源，显示默认选中的来源
            if (item.detail.source === 3011 && item.detail && item.detail.object_id) {
              // 如果来源是商品分组，则获取当前分组的商品列表
              this._getGroupsGoods()
            }
          }
        })
      },
      showModal() {
        this.tabIndex = 0
        this.left = 0
        this.lineWidth = this.typeList[0].title.length * 16 + 'px'
      }
    },
    beforeRouteEnter(to, from, next) {
      API.Cms.moduleShow({data: {code: 'gift_index'}})
        .then((res) => {
          next((vx) => {
            vx.moduleList = res.data.children
            res.data.children.forEach((item, idx) => {
              if (idx===0) {
                vx.moduleDetail = item
                // 模块没有detail的，初始化detail
                if (Array.isArray(item.detail) && item.detail.length === 0) {
                  item.detail = {image_url:'',image_id:'',object_id:'',source:'',title:''}
                }
                vx.outLink = item.detail.source || vx.typeList[0].status
              }
              switch (item.code) {
              case 'navigation':
                vx.navigationList = item.children
                break
              case 'hot_goods':
                vx.hotList = JSON.parse(JSON.stringify(item.children))
                vx.hotModuleData = item
                break
              case 'recommend':
                vx.recommendList = JSON.parse(JSON.stringify(item.children))
                vx.recommendModuleData = item
                break
              case 'banner':
                vx.bannerList = item.children
                break
              case 'brand_list':
                vx.brandList = item.children
                break
              case 'industry_recommend':
                vx.industryRecommendList = JSON.parse(JSON.stringify(item.children))
                break
              case 'best_recommend':
                vx.bestList = item.children
                break
              case 'brand_wall':
                vx.wallList = item.children
                break
              }
            })
          })
        })
        .catch(() => {
          next('404')
        })
    },
    created() {
      this._getCateList() // 获取分类列表
      this._getFilterBrandList()// 获取筛选品牌
      this._getGoodsList() // 商品列表
    },
    methods: {
      initData() {
        // 初始化部分参数
        this.selectSource = 0
        this.groupsGoodsList = []
      },
      tabChange(val) {
        this.pageType = val
        this.type = 'banner'
        this.typeList = TYPE_LIST
        this.bannerList = [JSON.parse(JSON.stringify(TEMPLATE_OBJ))]
        this.navigationList = [JSON.parse(JSON.stringify(TEMPLATE_OBJ))]
        this.initData()
        this.moduleShow(true)
      },
      searchGoods(keyword) {
        this.keyword = keyword
        this._getGoodsList()
      },
      searchArticle(keyword) {
        this.keyword = keyword
        this._getArticleList()
      },
      searchBrand() {
        this._getBrandList()
      },
      searchGroups(keyword) {
        this._getGroupsList(keyword)
      },
      changeBrandTitle(value, index) {
        this.$set(this[this.dataName][this.cmsIndex].detail, 'title', value)
        this.$forceUpdate()
      },
      // 获取页面详情
      moduleShow(changeTab = false) {
        API.Cms.moduleShow({data: {code: this.pageType}}).then((res) => {
          this.moduleList = res.data.children
          res.data.children.forEach((item, idx) => {
            if ((changeTab && idx === 0) || this.moduleDetail.code === item.code) {
              this.moduleDetail = item
              // 模块没有detail的，初始化detail
              if (Array.isArray(item.detail) && item.detail.length === 0) {
                item.detail = {image_url: '', image_id: '', object_id: '', source: '', title: ''}
              }
              this.outLink = item.detail.source || this.typeList[0].status
            }
            switch (item.code) {
            case 'navigation':
              this.navigationList = item.children
              break
            case 'hot_goods':
              this.hotList = JSON.parse(JSON.stringify(item.children))
              this.hotModuleData = item
              break
            case 'recommend':
              this.recommendList = JSON.parse(JSON.stringify(item.children))
              this.recommendModuleData = item
              break
            case 'banner':
              this.bannerList = item.children
              break
            case 'brand_list':
              this.brandList = item.children
              break
            case 'industry_recommend':
              this.industryRecommendList = JSON.parse(JSON.stringify(item.children))
              break
            case 'best_recommend':
              this.bestList = item.children
              break
            case 'brand_wall':
              this.wallList = item.children
              break
            }
          })
        })
      },
      // 判断
      justifyForm(done) {
        let msg = ''
        switch (this.outLink) {
        case 3004:
          if (!this.outHtml) {
            msg = 'H5链接不能为空'
            this.$toast.show('')
          }
          break
        case 3005:
          if (!this.miniLink) {
            msg = '小程序链接不能为空'
          }
          break
        default:
          break
        }
        if (msg) {
          this.$toast.show(msg)
          return
        }
        done()
      },
      // 弹窗确定选择链接
      miniGoods() {
        let index = this.bannerIndex
        if (this.outLink !== 3011) {
          this[this.dataName][index].style = this.outLink
        }
        switch (this.outLink) {
        case 3004:
          if (!this.outHtml) {
            this.$toast.show('H5链接不能为空')
            return
          }
          this[this.dataName][index].detail.url = this.outHtml
          if (this.moduleDetail.code !== 'brand_wall' && this.moduleDetail.code !== 'navigation') this[this.dataName][index].detail.title = ''
          break
        case 3005:
          if (!this.miniLink) {
            this.$toast.show('小程序链接不能为空')
            return
          }
          this[this.dataName][index].detail.url = this.miniLink
          if (this.moduleDetail.code !== 'brand_wall' && this.moduleDetail.code !== 'navigation') this[this.dataName][index].detail.title = ''
          break
        case 3002:
        case 3003:
        case 3006:
        case 2011:
          if (this.currentItem !== '') {
            this[this.dataName][index].detail.image_url = this.currentItem.image_url||this.currentItem.goods_cover_image||''
            this[this.dataName][index].detail.image_id = this.currentItem.image_id||''
            this[this.dataName][index].detail.object_id = this.currentItem.id
            this[this.dataName][index].detail.url = ''
            this[this.dataName][index].detail.title = this.currentItem.name || this.currentItem.title
            this[this.dataName][index].detail.sale_price = this.currentItem.price || ''
            this[this.dataName][index].detail.source = this.outLink
            this[this.dataName][index].detail.status = this.currentItem.status||1
          }
          break
        case 3009:
          // 品牌列表
          if (this.currentItem !== '') {
            this[this.dataName][index].detail.status = this.currentItem.status||1
            this[this.dataName][index].detail.object_id = this.currentItem.id
            this[this.dataName][index].detail.url = ''
            this[this.dataName][index].detail.logo_image_url = this.currentItem.logo_image_url
            this[this.dataName][index].detail.image_url = this.currentItem.logo_image_url || this.currentItem.banner_image_url
            this[this.dataName][index].detail.image_id = this.currentItem.logo_image_id || this.currentItem.banner_image_id
            this[this.dataName][index].detail.title = this.currentItem.name || this.currentItem.title
            this.$set(this[this.dataName][index].detail, 'brand', {
              logo_image_url: this.currentItem.logo_image_url || this.currentItem.banner_image_url,
              image_url: this.currentItem.logo_image_url || this.currentItem.banner_image_url,
              image_id: this.currentItem.logo_image_id || this.currentItem.banner_image_id,
              name: this.currentItem.name,
              sub_name: this.currentItem.sub_name
            })
          }
          break
        case 3010:
          // 商品品牌
          if (this.currentItem !== '') {
            this[this.dataName][index].detail.status = this.currentItem.status||1
            this[this.dataName][index].detail.object_id = this.currentItem.id
            this[this.dataName][index].detail.url = ''
            this[this.dataName][index].detail.logo_image_url = this.currentItem.logo_image_url
            this[this.dataName][index].detail.image_url = this.currentItem.logo_image_url || this.currentItem.banner_image_url
            this[this.dataName][index].detail.image_id = this.currentItem.logo_image_id || this.currentItem.banner_image_id
            this[this.dataName][index].detail.title = this.currentItem.name.slice(0, 4)
          }
          break
        case 3011:
          // 商品分组
          this.moduleDetail.detail.title = this.currentItem.name
          this.moduleDetail.detail.object_id = this.currentItem.id
          this._getGroupsGoods()
          break
        }
        this.$forceUpdate()
        this.categoryId = ''
        this.brandId = ''
      },
      // 获取分类
      _getCateList() {
        let data = {pid: 0, goods_id: '', get_goods_count: 1, limit: 0, sale_channel: 'purchase'}
        API.Cms.categoryList({data}).then((res) => {
          this.goodsCate = JSON.parse(JSON.stringify(res.data))
          let arr = JSON.parse(JSON.stringify(res.data))
          arr.unshift({name: '全部', id: ''})
          this.classList = arr
        })
      },
      // 获取品牌筛选
      _getFilterBrandList() {
        API.Brand.getBrandList({data: {limit: 50}}).then(res => {
          this.filterBrandList = [{
            name: '全部', id: ''
          }, ...res.data]
        })
      },
      // 获取商品列表
      _getGoodsList() {
        let data = {
          status: 1,
          keyword: this.keyword,
          limit: 6,
          page: this.goodsPage,
          use_type: ''
        }
        // 礼品馆=>兑换商品    品牌馆=>自有商品
        if (this.pageType === 'gift_index') {
          data.sale_channel = 'purchase'
          data.category_id = this.categoryId
          data.use_type = 1
        }
        if (this.pageType === 'brand_index') {
          data.brand_id = this.brandId
          data.use_type = 2
        }
        API.Cms.goodsList({data})
          .then(res => {
            this.total = res.meta.total
            this.choiceGoods = res.data
            this.showSelectIndex = this.choiceGoods.findIndex((item) => item.id === this.goodsId)
          })
      },
      _getArticleList() {
        let data = {keyword: this.keyword, page: this.goodsPage, limit: 6, status: 1}
        API.Cms.articleList({data})
          .then(res => {
            this.total = res.meta.total
            this.articleArr = res.data
            this.showSelectIndex = this.articleArr.findIndex((item) => item.id === this.articleId)
          })
      },
      // 获取品牌列表
      _getBrandList() {
        let data = {keyword: this.keyword, page: this.goodsPage, limit: 6, status: 1}
        API.Cms.brandList({data}).then((res) => {
          this.total = res.meta.total
          this.brandArr = JSON.parse(JSON.stringify(res.data))
        })
      },
      // 获取商品分组
      _getGroupsList(keyword='') {
        let data = {keyword}
        API.Cms.groupsList({data}).then((res) => {
          this.groupsList = JSON.parse(JSON.stringify(res.data))
        })
      },
      // 获取分组商品列表
      _getGroupsGoods() {
        let data = {id: this.moduleDetail.detail.object_id}
        API.Cms.groupsGoodsList({data}).then((res) => {
          this.groupsGoodsList = JSON.parse(JSON.stringify(res.data))
          // 给当前的list赋值，只做展示
          this[this.dataName] = this.groupsGoodsList.map((item) => {
            return {
              detail: {
                object_id: item.goods_id,
                title: item.name,
                image_url: item.goods_cover_image,
                goods_cover_image: item.goods_cover_image,
                sale_price: item.price,
                add_icon: ADD_IMAGE,
                status: item.status
              },
              style: this.moduleDetail.detail.source
            }
          })
        })
      },
      showModalBox(index, id) {
        this.showModal = true
        this.bannerIndex = index
        this.goodsId = id
        this.outLink = this.typeList[0].status
        this.showSelectIndex = this.outLink === 3005 ? this.choiceGoods.findIndex((item) => item.id === this.goodsId) : -1
        this.showCateIndex = this.outLink === 3004 ? this.goodsCate.findIndex((item) => item.id === this.goodsId) : -1
        this.requestHandle()
      },
      // 分组弹窗
      showGroupsModal() {
        this.showModal = true
        this.outLink = 3011
        this.requestHandle()
      },
      selectGoods(item, index) {
        this.currentItem = item
        this.showSelectIndex = index
      },
      setLinkType(index, e) {
        this.tabIndex = index
        this.left = e.target.offsetLeft + 'px'
        this.lineWidth = e.target.offsetWidth + 'px'
        this.outLink = this.typeList[index].status
        this.showSelectIndex = -1
        this.currentItem = ''
        this.goodsPage = 1
        this.keyword = ''
        this.requestHandle()
      },
      // 请求列表控制器
      requestHandle() {
        switch (this.outLink) {
        case 3002:
          this._getGoodsList()
          break
        case 3006:
          this._getArticleList()
          break
        case 3010:
        case 3009:
          this._getBrandList()
          break
        case 2011:
          this._getGoodsList()
          break
        case 3011:
          this._getGroupsList()
          break
        }
      },
      hideGoods() {
        this.showModal = false
        this.showSelectIndex = -1
        this.currentItem = ''
        this.outHtml = ''
        this.miniLink = ''
        this.goodsPage = 1
        this.keyword = ''
        this.showCateIndex = -1
        this.categoryId = ''
        this.brandId = ''
      },
      getIndex(index) {
        this.cmsIndex = index
      },
      // 添加图片
      successImage(res) {
        this.$set(this[this.dataName][this.cmsIndex].detail, 'image_url', res.data.url)
        this.$set(this[this.dataName][this.cmsIndex].detail, 'image_id', res.data.id)
        this.$forceUpdate()
      },
      // 修改banner
      successBanner(res) {
        this.moduleDetail.detail.image_url = res.data.url
        this.moduleDetail.detail.image_id = res.data.id
      },
      newCms() {
        let type = ''
        switch (this.type) {
        case 'navigation':
          type = '类目'
          if (this[this.dataName].length >= 5) {
            this.$toast.show('最多添加5个' + type)
            return
          }
          break
        case 'recommend':
        case 'hot':
          type = '商品'
          if (this[this.dataName].length >= 20) {
            this.$toast.show('最多添加20个' + type)
            return
          }
          break
        case 'banner':
          if (this.pageType === 'gift_index') {
            type = 'banner'
          } else {
            type = '文章'
          }
          if (this[this.dataName].length >= 10) {
            this.$toast.show('最多添加10个' + type)
            return
          }
          break
        case 'brand':
          type = '品牌'
          if (this[this.dataName].length >= 20) {
            this.$toast.show('最多添加20个' + type)
            return
          }
          break
        case 'best':
          type = '精品推荐'
          if (this[this.dataName].length >= 20) {
            this.$toast.show('最多添加20个' + type)
            return
          }
          break
        case 'wall':
          type = '品牌'
          if (this[this.dataName].length >= 10) {
            this.$toast.show('最多添加10个' + type)
            return
          }
          break
        }

        let obj = {
          detail: {
            object_id: '',
            url: '',
            title: '',
            image_id: '',
          },
          style: ''
        }
        this[this.dataName].push(obj)
        let ele = document.querySelector('.box')
        setTimeout(() => {
          ele.scrollTop = ele.scrollHeight
        }, 100)
      },
      // 保存
      submitBtn() {
        this.moduleSave()
      },
      infoData() {
        this.moduleList.forEach((item, index) => {
          if ((this.type !== 'recommend' && item.code.includes(this.type)) || this.type === 'recommend') {
            if (item.code === 'industry_recommend' && this.type === 'recommend') {
            } else {
              this[this.dataName] = this[this.dataName].map((cms, cmsIndex) => {
                cms.parent_id = item.id
                cms.sort = cmsIndex
                return cms
              })
            }
          }
        })
      },
      childrenModuleSave() {
        let type = ''
        switch (this.type) {
        case 'navigation':
          type = '类目';
          break
        case 'hot':
        case 'recommend':
          type = '商品';
          break
        case 'banner':
          if (this.pageType === 'gift_index') {
            type = 'banner'
          } else {
            type = '文章'
          }
          break
        case 'brand':
        case 'wall':
          type = '品牌'
          break
        case 'best':
          type = '精品推荐'
          break
        }
        if (!this[this.dataName].length) {
          this.$toast.show(`${type}不能为空`, 1500)
          return
        } else {
          for (let i = 0; i < this[this.dataName].length; i++) {
            if (!this[this.dataName][i].detail.image_id) {
              this.$toast.show(`第${i + 1}${type}个图片不能为空`, 1500)
              return
            } else if (!this[this.dataName][i].detail.title && !this[this.dataName][i].detail.url) {
              this.$toast.show(`第${i + 1}${type}个不能为空`, 1500)
              return
            }
          }
        }
        this.infoData()
        API.Cms.saveModuleData({data: {data: this[this.dataName]}}).then((res) => {
          this.$toast.show('保存成功')
          this.moduleShow()
        })
      },
      // 获取分组商品参数
      moduleSave() {
        // 只要来源不是分组商品都要传children
        if (this.outLink === 3011) {
          if (!this.moduleDetail.detail || !this.moduleDetail.detail.object_id) {
            this.$toast.show(`请选择商品分组`, 1500)
            return
          }
        } else {
          let type = ''
          switch (this.type) {
          case 'navigation':
            type = '类目';
            break
          case 'hot':
          case 'recommend':
            type = '商品';
            break
          case 'banner':
            if (this.pageType === 'gift_index') {
              type = 'banner'
            } else {
              type = '文章'
            }
            break
          case 'brand':
          case 'wall':
            type = '品牌'
            break
          case 'best':
            type = '精品推荐'
            break
          }
          if (!this[this.dataName].length) {
            this.$toast.show(`${type}不能为空`, 1500)
            return
          } else {
            for (let i = 0; i < this[this.dataName].length; i++) {
              if (!this[this.dataName][i].detail.image_url) {
                this.$toast.show(`第${i + 1}个${type}图片不能为空`, 1500)
                return
              } else if (!this[this.dataName][i].detail.title && !this[this.dataName][i].detail.url) {
                this.$toast.show(`第${i + 1}个${type}不能为空`, 1500)
                return
              }
            }
          }
          this.moduleDetail.children = this[this.dataName]
          this.moduleDetail.detail.object_id = ''
          this.moduleDetail.detail.title = ''
        }
        if (['hot_goods', 'recommend', 'best_recommend'].includes(this.moduleDetail.code)) {
          this.moduleDetail.detail.source = this.outLink
          // 来源是分组，不需要传children
          if (this.outLink === 3011) {
            delete this.moduleDetail.children
          }
        }
        this.infoData()
        console.log(JSON.stringify(this.moduleDetail))
        API.Cms.saveModule({data: {data: [this.moduleDetail]}}).then((res) => {
          this.$toast.show('保存成功')
          // 如果来源不是分组，则清除分组商品列表
          if (this.outLink !== 3011) {
            this.groupsGoodsList = []
            this.currentItem = ''
            this.showSelectIndex = -1
          }
          this.moduleShow()
        })
      },
      //
      showConfirm(id, index) {
        this.delId = id
        this.delIndex = index
        if (!id) {
          this[this.dataName].splice(index, 1)
          return
        }
        this.$confirm
          .confirm()
          .then(() => {
            API.Cms.delDestroy({data: {id: this.delId}}).then((res) => {
              this[this.dataName].splice(index, 1)
            })
          })
          .catch(() => {
          })
      },
      deleteGoodsMainPic() {
        this[this.dataName][this.cmsIndex].detail.image_url = ''
        this[this.dataName][this.cmsIndex].detail.image_id = ''
      },
      // 选择商品来源
      _selectSource(select) {
        this.selectSource = select
        this.outLink = select === 0 ? 3011 : 3002
        // 如果当前选择的来源等于之前保存的来源，就赋值保存的商品列表，否则显示初始列表
        if (this.outLink === this.moduleDetail.detail.source) {
          this[this.dataName] = this.moduleDetail.children
        } else {
          if (select === 0) {
            // 如果是选择分组商品，展示当前选择的商品分组
            this[this.dataName] = this.groupsGoodsList.map((item) => {
              return {
                detail: {
                  object_id: item.goods_id,
                  title: item.name,
                  image_url: item.goods_cover_image,
                  goods_cover_image: item.goods_cover_image,
                  add_icon: ADD_IMAGE,
                  status: item.status
                },
                style: this.moduleDetail.detail.source
              }
            })
          } else {
            this[this.dataName] = []
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"

  .page-manage
    position: relative
    width: 100%
    display: flex
    flex-direction: column
    .content-wrap
      flex: 1
      padding: 20px
    .content-detail
      overflow: hidden
      border: 0.5px solid $color-line
      border-radius: 4px
      background: $color-white
      width: 100%
      height: 100%
      max-height: 100%
      box-sizing: border-box

  .edit-modular
    height: 100%
    max-height: 100%
    box-sizing: border-box
    overflow-y: hidden
    position: relative

  .box
    top: 0
    left: 0
    bottom: 60px
    width: 100%
    overflow-x: hidden
    position: absolute
    padding: 81px 20px 60px 0
    box-sizing: border-box
    &::-webkit-scrollbar
      width: 4px
      height: 4px
      opacity: 0
      transition: all 0.2s
    &::-webkit-scrollbar-thumb
      background-color: rgba(0, 0, 0, .05)
      border-radius: 10px
    &::-webkit-scrollbar-thumb:hover
      background-color: rgba(0, 0, 0, .1)
    &::-webkit-scrollbar-track
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .05)
      border-radius: 10px

  /*基本信息类头部盒子样式*/
  .content-header
    border-bottom: 1px solid $color-line
    display: flex
    align-items: center
    position: relative
    box-sizing: border-box
    padding-bottom: 16px
    line-height: 1
    margin-bottom: 30px
    .excel
      margin-left: 20px
      &:hover
        color: $color-white
    &:before
      content: ''
      position: absolute
      width: 3px
      height: 16px
      background: $color-main
      border-radius: 2px
      top: 0
      left: 0
    .content-title
      text-indent: 13.5px
      color: $color-text-main
      font-family: $font-family-regular
      font-size: $font-size-16
    .content-sub
      margin-left: 10px
      color: #868DAA
      font-family: $font-family-regular
      font-size: $font-size-12
    &.sub-header
      margin-top: 24px
      &::before
        display: none
      .content-title
        text-indent: 0

  .advertisement-msg
    height: 140px
    padding: 0 20px
    box-sizing: border-box
    width: 100%
    background: #F4F8F9
    display: flex
    align-items: center
    position: relative
    margin-top: 24px
    user-select: none
    .img-box
      position: relative
      width:100px
      height:100px
      margin:0 20px 0 0
      background: #FFF
      .status-box
        position: absolute
        top: 15px
        left: 15px
        width:70px
        height:70px
        line-height:70px
        font-family: $font-family-regular
        color: #fff
        text-align: center
        background: rgba(0,0,0,0.5)
        border-radius: 100%
    .cate-image
      width:100px
      height:100px
      margin:0 20px 0 0
      object-fit: cover
      border: none
    .add-advertisement
      position: relative
      margin-left: 20px
      display: flex
      align-items: center
      .add-title
        line-height: 1
        text-decoration: underline
        color: $color-sub
        margin-left: 4px
        font-family: $font-family-regular
        font-size: $font-size-14
        white-space: nowrap
      .select-type
        top: 24px
        background: $color-white
        box-shadow: 0 0 5px 0 rgba(12, 6, 14, 0.20)
        border-radius: 2px
        position: absolute
        &.fade-enter, &.fade-leave-to
          opacity: 0
        &.fade-enter-to, &.fade-leave-to
          transition: opacity .3s ease-in-out
        .select-item
          width: 140px
          line-height: 42px
          height: 42px
          border-bottom: 0.5px solid $color-line
          box-sizing: border-box
          text-indent: 11px
          font-size: $font-size-14
          font-family: $font-family-regular
          color: $color-text-main
          transition: all 0.3s
          &:last-child
            border: none
        .select-item-active
          color: $color-sub
    .advertisement-link
      display: flex
      align-items: center
      overflow: hidden
      .top-box
        layout(row)
        align-items: center
      .goods-title
        flex: 1
        margin-left: 18px
        line-height: 1.2
        no-wrap()
        font-family: $font-family-regular
        color: $color-text-main
        font-size: $font-size-14
        &.margin-left-0
          margin-left: 0
      .brand-title
        width: 40px
        height: 20px
    .column
      align-items: flex-start
      flex-direction: column
      justify-content: space-between
      height: 92px

  .add-icon
    margin: 0 3px 0 0

  .use
    position: absolute
    top: 20px
    right: 20px
    white-space: nowrap
    font-size: $font-size-14
    margin-left: 21px
    line-height: 1
    user-select: none
    transition: all 0.2s

  .shade-header
    display: flex
    justify-content: space-between
    height: 52px
    box-sizing: border-box
    padding: 23px 20px 0 0
    .shade-tab-type
      height: 100%
      display: flex
      position: relative
      .shade-tab-item
        line-height: 1
        display: flex
        transition: all 0.3s
        color: $color-text-main
        font-family: $font-family-regular
      .shade-tab-item-active
        font-family: $font-family-medium
      .line
        transition: all 0.3s
        left: 40px
        position: absolute
        bottom: 0px
        height: 3px
        width: 64px
        background: $color-main
        border-radius: 3px
    .shade-title
      color: $color-text-main
      font-family: $font-family-medium
      font-size: $font-size-16
    .close
      icon-image('icon-close')
      width: 12px
      height: @width
      transition: all 0.3s

  .model
    width: 52.08vw
    height: 592px
    .shade-header
      display: flex
      justify-content: space-between
      height: 52px
      box-sizing: border-box
      padding: 23px 0 0 0
      .shade-tab-type
        height: 100%
        display: flex
        position: relative
        .shade-tab-item
          position: relative
          line-height: 1
          display: flex
          transition: all 0.3s
          color: $color-text-main
          font-family: $font-family-regular
          margin-right: 40px
        .shade-tab-item-active
          font-family: $font-family-medium
        .line
          transition: all 0.3s
          left: 0
          position: absolute
          bottom: 0
          height: 3px
          width: 32px
          background: $color-main
          border-radius: 3px
      .shade-title
        color: $color-text-main
        font-family: $font-family-medium
        font-size: $font-size-16
      .close
        icon-image('icon-close')
        width: 12px
        height: @width
        transition: all 0.3s

  .shade-tab
    height: 68px
    align-items: center
    box-sizing: border-box
    display: flex

  .goods-content
    border-radius: 4px
    height: 405px
    .goods-list
      flex-wrap: wrap
      display: flex
    .goods-item
      box-sizing: border-box
      padding: 0 20px 0 20px
      width: 100%
      height: 60px
      display: flex
      align-items: center
      position: relative
      &:last-child
        border-bottom-1px($color-line)
      &:before
        content: ""
        pointer-events: none // 解决iphone上的点击无效Bug
        display: block
        position: absolute
        left: 0
        top: 0
        transform-origin: 0 0
        border-right: 1px solid #E9ECEE
        border-left: 1px solid #E9ECEE
        border-top: 1px solid #E9ECEE
        box-sizing border-box
        width: 200%
        height: 100%
        transform: scaleX(.5) translateZ(0)
        @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
          width: 100%
          height: 300%
          transform: scaleX(1 / 3) translateZ(0)
      &:nth-child(2n)
        background: #F4F8F9
      .goods-img
        margin-right: 10px
        width: 40px
        height: @width
        min-height: @width
        min-width: @width
        object-fit: cover
        overflow: hidden
        background-repeat: no-repeat
        background-size: cover
        background-position: center
        background-color: $color-background
      .goods-name
        no-wrap()
      .goods-name, .goods-money
        line-height: 1
        font-size: $font-size-14
      .add-btn
        border-radius: 2px
        margin-left: 88px
        padding: 7px 0
        width: 56px
        text-align: center
      .add-btn-disable
        border-radius: 2px
        margin-left: 88px
        padding: 7px 0
        width: 56px
        box-sizing: border-box
        text-align: center
        font-size: $font-size-14
        line-height: 1
        cursor: not-allowed
        background: $color-line
        color: $color-text-assist
    .goods-header
      height: 45px
      background: #F4F8F9
      display: flex
    .goods-text
      font-size: $font-size-14
      font-family: $font-family-regular
      color: $color-text-main
      &:nth-child(1)
        min-width: 38px
        max-width: 38px
      &:nth-child(2)
        flex: 2
      &:nth-child(3)
        flex: 1
      &:nth-child(4)
        max-width: 80px
        flex: 0.5
    .goods-msg
      align-items: center
      display: flex

  .article .goods-text
    &:nth-child(2)
      flex: 1
    &:nth-child(3)
      flex: 1.4
      max-width: 60%
      no-wrap()
  .goods .goods-text
    &:nth-child(2)
      flex: 2
      padding-right: 20px
      max-width: 70%
      no-wrap()

  .page-box
    box-sizing: border-box
    height: 76px
    align-items: center
    display: flex

  .goods-cate
    flex: 1
    width: 100%
    height: 520px
    margin: 20px auto 0
    border-radius: 2px
    overflow-x: hidden
    &::-webkit-scrollbar
      width: 4px
      height: 4px
      transition: all 0.2s
    &::-webkit-scrollbar-thumb
      background-color: rgba(0, 0, 0, .06)
      border-radius: 10px
    &::-webkit-scrollbar-thumb:hover
      background-color: rgba(0, 0, 0, .15)
    &::-webkit-scrollbar-track
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .06)
      border-radius: 10px
  .goods_cate-item
    display: flex
    align-items: center
    padding: 0 20px
    height: 60px
    position: relative
    box-sizing: border-box
    &:nth-child(2n - 1)
      background: #f5f7fa
    &:last-child
      border-bottom-1px($color-line)
    &:before
      content: ""
      pointer-events: none // 解决iphone上的点击无效Bug
      display: block
      position: absolute
      left: 0
      top: 0
      transform-origin: 0 0
      border-right: 1px solid #E9ECEE
      border-left: 1px solid #E9ECEE
      border-top: 1px solid #E9ECEE
      box-sizing border-box
      width: 200%
      height: 100%
      transform: scaleX(.5) translateZ(0)
      @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
        width: 100%
        height: 300%
        transform: scaleX(1 / 3) translateZ(0)
    .shade-goods-msg
      flex: 1
      justify-content: space-between
      display: flex
    .shade-goods-name
      width: 500px
      no-wrap()
    .shade-goods-name, .shade-goods-num
      font-size: $font-size-14
      color: $color-text-main

  .link-text-box
    width: 100%
    height: 220px
    margin: 20px auto 0
    border: 0.5px solid $color-line
    border-radius: 2px
    outline: none
    display: block
    resize: none
    padding: 20px 14px
    box-sizing: border-box
    position: relative
    background: #F9F9F9
    &:focus
      background: $color-white

  //  单选框
  .select-icon
    width: 18px
    height: 18px
    border-radius: 50%
    background: $color-white
    border: 1px solid $color-line
    transition: all, 0.3s
    position: relative
    transform-origin: 50%
    margin-right: 20px
    .after
      all-center()
      transform-origin: 50%
      transition: all, 0.3s
      width: 0
      height: 0
      border-radius: 50%

  .select-icon-active
    border: 5px solid $color-main
  .sub-title
    font-size: 16px
    color: $color-text-main
  .source-con
    layout(row)
    align-items: center
    font-size: 14px
    color: $color-text-main
    .source-title
      margin-right: 30px
    .source-box
      margin-right: 60px
      layout(row)
      align-items: center
    .select-icon
      margin-right: 10px
  .groups-con
    margin-top: 24px
    layout(row)
    align-items: center
    font-size: 14px
    .groups-val
      margin: 0 30px 0 10px
      color: $color-text-main
    .groups-delete
      color: $color-btn
  .groups-header .goods_cate-item
    height: 45px
    padding: 0 58px
    background: #f5f7fa
    &:after
      content: ""
      pointer-events: none // 解决iphone上的点击无效Bug
      display: block
      position: absolute
      left: 0
      top: 0
      transform-origin: 0 0
      border-right: 1px solid #E9ECEE
      border-left: 1px solid #E9ECEE
      border-bottom: 1px solid #E9ECEE
      box-sizing border-box
      width: 200%
      height: 100%
      transform: scaleX(.5) translateZ(0)
      @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
        width: 100%
        height: 300%
        transform: scaleX(1 / 3) translateZ(0)
  .groups-content
    flex: 1
    width: 100%
    height: 428px
    border-radius: 2px
    overflow-x: hidden
    &::-webkit-scrollbar
      width: 4px
      height: 4px
      transition: all 0.2s
    &::-webkit-scrollbar-thumb
      background-color: rgba(0, 0, 0, .06)
      border-radius: 10px
    &::-webkit-scrollbar-thumb:hover
      background-color: rgba(0, 0, 0, .15)
    &::-webkit-scrollbar-track
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .06)
      border-radius: 10px
    .goods_cate-item
      padding-right: 58px
      background: #f5f7fa
      &:first-child
        &:before
          border-top: none
      &:nth-child(2n-1)
        background: none

</style>
