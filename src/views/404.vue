<template>
	<div class="dashboard_main_container">
		<div class="statistic">
			<ul>
				<li>
					<div>
						<label>今日来料单数</label>
						<span>111</span>
					</div>
				</li>
				<li>
					<div>
						<label>今日领料单数</label>
						<span>111</span>
					</div>
				</li>
				<li>
					<div>
						<label>今日入库物料</label>
						<span>111</span>
					</div>
				</li>
				<li>
					<div>
						<label>今日出库物料</label>
						<span>111</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="inventoryutilization" id="inventoryutilization" style="height:400px;"></div>
	</div>
</template>

<script>


export default {
	name: 'Dashboard',
	components: {

	},
	data() {
		return {

		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			var myChart = echarts.init(document.getElementById('inventoryutilization'));
			var option = {
				// backgroundColor: '#080b30',
				title: {
					text: '2020-年度库存利用率趋势分析',
					textStyle: {
						align: 'center',
						color: '#fff',
						fontsize: 10,
					},
					top: '5%',
					left: 'center',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						lineStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: 'rgba(0, 255, 233,0)'
								}, {
									offset: 0.5,
									color: 'rgba(255, 255, 255,1)',
								}, {
									offset: 1,
									color: 'rgba(0, 255, 233,0)'
								}],
								global: false
							}
						},
					},
				},
				grid: {
					top: '0%',
					left: '30px',
					right: '0%',
					bottom: '5%',
					// containLabel: true
				},
				xAxis: [{
					type: 'category',
					axisLine: {
						show: false
					},
					splitArea: {
						// show: true,
						color: '#f00',
						lineStyle: {
							color: '#f00'
						},
					},
					axisLabel: {
						color: '#000'
					},
					splitLine: {
						show: false
					},
					boundaryGap: false,
					data: ['A', 'B', 'C', 'D', 'E', 'F'],

				}],

				yAxis: [{
					type: 'value',
					min: 0,
					// max: 140,
					splitNumber: 4,
					splitLine: {
						show: true,
						lineStyle: {
							color: '#E8E8E8'
						}
					},
					axisLine: {
						show: false,
					},
					axisLabel: {
						margin: 20,
						textStyle: {
							color: '#000',

						},
					},
					axisTick: {
						show: false,
					},
				}],
				series: [{
						name: '注册总量',
						type: 'line',
						// smooth: true, //是否平滑
						showAllSymbol: true,
						symbol: 'circle',
						symbolSize: 15,
						lineStyle: {
							normal: {
								color: "#3A84FF",
								shadowColor: 'rgba(0, 0, 0, .3)',
								shadowBlur: 0,
								shadowOffsetY: 0,
								shadowOffsetX: 0,
							},
						},
						label: {
							show: true,
							position: 'top',
							textStyle: {
								color: '#3A84FF',
							}
						},
						itemStyle: {
							color: "#fff",
							borderColor: "#3A84FF",
							borderWidth: 3,
							shadowColor: 'rgba(0, 0, 0, .3)',
							shadowBlur: 0,
							shadowOffsetY: 0,
							shadowOffsetX: 0,
						},
						tooltip: {
							show: false
						},
						areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: 'rgba(58,132,255,0.3)'
									},	{
										offset: 1,
										color: 'rgba(108,80,243,0)'
									}
								], false),
								shadowColor: 'rgba(58,132,255, 0.9)',
								shadowBlur: 20
							}
						},
						data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02, ]
					}]
			};

			myChart.setOption(option);
		}
	}
}
</script>

<style lang="scss" scoped></style>
