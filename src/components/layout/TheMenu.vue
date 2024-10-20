<template>
    <div class="menu">
        <div class="menu-container">
            <div class="left-container">
                <div class="menu-item-container">
                    <router-link to="/dashboard" class="menu-focus" active-class="active">
                        <div class="menu-item">
                            <div class="menu-item__icon">
                                <icon class="icon icon-tq"></icon>
                            </div>
                            <div class="menu-item__text">Dashboard</div>
                        </div>
                    </router-link>
                    <router-link to="/sell" class="menu-focus" active-class="active">
                        <div class="menu-item">
                            <div class="menu-item__icon">
                                <icon class="icon icon-tq"></icon>
                            </div>
                            <div class="menu-item__text">Bán hàng</div>
                        </div>
                    </router-link>
                    <router-link to="" class="menu-focus" active-class="active">
                        <div class="menu-item">
                            <div class="menu-item__icon">
                                <icon class="icon icon-tq"></icon>
                            </div>
                            <div class="menu-item__text">Quản lý sản phẩm</div>
                        </div>
                    </router-link>
                    <router-link to="" class="menu-focus" active-class="active">
                        <div class="menu-item">
                            <div class="menu-item__icon">
                                <icon class="icon icon-tq"></icon>
                            </div>
                            <div class="menu-item__text">Quản lý đơn hàng</div>
                        </div>
                    </router-link>
                    <router-link to="/report" class="menu-focus" active-class="active">
                        <div class="menu-item">
                            <div class="menu-item__icon">
                                <icon class="icon icon-tq"></icon>
                            </div>
                            <div class="menu-item__text">Báo cáo</div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.menu{
    background: #fff;
    height: calc(100% - 56px);
    width: 204px;
    transition: width .2s;
    z-index: 12;
    box-shadow: inset 0 1.5px 2px 0 rgba(0,0,0,.1);
}

.menu-container{
    height: 100%;
    border-right: 1px solid #000;
}

.left-container{
    display: block;
    float: left;
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
}

.menu-item-container{
    margin-top: 8px;
}

.menu-item{
    font-weight: 500;
    display: block;
    color: #000;
    position: relative;
    padding: 12px 0 12px 52px;
    margin: 8px 8px;
    cursor: pointer;
}

.menu-item:hover {
    color: #ff6d00;
    background: #fbe9e7;
}

/* .menu-focus:focus>div{
    color: #ff6d00;
    background: #fbe9e7;
} */

.menu-item__icon icon{
    display: block;
    height: 24px;
    width: 24px;
    position: absolute;
    top: 8px;
    left: 12px;
    background-repeat: no-repeat;
    background-color: transparent;
}

.item-arrow{
    height: 24px;
    width: 24px;
    position: absolute;
    right: 12px;
    top: 8px;
    opacity: 1;
    transition: opacity .6s linear;
}

.menu-line{
    border-top: 2px solid #ddd;
    margin: 0 14px;
}

.toggle_btn{
    margin: 0 8px 0 8px;
    width: 92%;
    border-radius: 8px;
    height: 40px;
    line-height: 40px;
    background: #edf1f5;
}

.toggle-icon icon{
    display: inline-block;
    margin-top: 8px;
    margin-left: 16px;
    left: 0;
    height: 24px;
    width: 24px;
    transform: rotate(0deg);
    transition-duration: .4s;
}

.toggle-text{
    position: absolute;
    left: 40px;
    bottom: 0px;
}

.router-link-exact-active .menu-item{
    color: #ff6d00 !important;
    background: #fbe9e7;
}
</style>