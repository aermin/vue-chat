<template>
<div class="tips" v-if="isShow">
	<div v-if="type === 'success' " class="success-tip">
		<svg class="icon" aria-hidden="true" style="font-size : 0.2rem">
                            <use  xlink:href="#icon-success1"></use>
                        </svg> {{message}}
	</div>
	<div v-if="type === 'warn' " class="warn-tip">
		<svg class="icon" aria-hidden="true" style="font-size : 0.2rem">
                            <use  xlink:href="#icon-warn1"></use>
                        </svg> {{message}}
	</div>
	<div v-if="type === 'error' " class="error-tip">
		<svg class="icon" aria-hidden="true" style="font-size : 0.2rem">
                            <use  xlink:href="#icon-error1"></use>
                        </svg> {{message}}
	</div>


</div>
</template>

<script type="text/javascript">
export default {
	name: 'Message',
	data() {
		return {
			message: '',
			type: "success",
			time: 3000,
			isShow: true
		}
	},
	mounted() {
		this.close()
	},
	methods: {
		close() {
			var that = this
			window.setTimeout(function() {
				that.isShow = false
			}, this.time);
		}
	}
}
</script>

<style lang="scss" scoped>
.tips {
    position: fixed;
    top: 0.23rem;
    left: 50%;
    font-size: 0.14rem;
    transform: translate(-50%, 0);
    z-index: 999999999;
    .error-tip,
    .success-tip,
    .warn-tip {
        pointer-events: all;
        padding: 0.12rem 0.18rem;
        border-radius: 0.06rem;
        box-shadow: 0 0.02rem 0.08rem rgba(0, 0, 0, .2);
        background: #fff;
        color: #495060;
    }
}
</style>
