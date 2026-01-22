  // ModuleDetailsChart Component
        class ModuleDetailsChart {
            constructor(element) {
                this.element = element;
                this.elementId = 'chart-' + Math.random().toString(36).substr(2, 9);
                
                // Parse data attributes
                this.modules = this.parseJSON(element.dataset.modules, [
                    { name: 'Email', value: 4, color: '#3B82F6' },
                    { name: 'SMS', value: 4, color: '#F97316' },
                    { name: 'USB', value: 7, color: '#A855F7' },
                    { name: 'NFC', value: 5, color: '#8B5CF6' },
                    { name: 'QR', value: 6, color: '#06B6D4' },
                    { name: 'Whatapp', value: 3, color: '#10B981' },
                ]);
                
                this.chartSize = element.dataset.chartSize || '170px';
                this.title = element.dataset.title || 'Module Details';
                this.dropdownOptions = this.parseJSON(element.dataset.dropdownOptions, ['Weekly', 'Monthly', 'Yearly']);
                this.defaultOption = element.dataset.defaultOption || 'Weekly';
                this.selectedOption = this.defaultOption;
                
                this.init();
            }

            parseJSON(jsonString, defaultValue) {
                try {
                    return jsonString ? JSON.parse(jsonString) : defaultValue;
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    return defaultValue;
                }
            }

            init() {
                this.render();
                this.initChart();
                this.attachEventListeners();
            }

            render() {
                const totalModules = this.modules.reduce((sum, module) => sum + module.value, 0);
                
                // Split modules into two columns
                const midPoint = Math.ceil(this.modules.length / 2);
                const leftModules = this.modules.slice(0, midPoint);
                const rightModules = this.modules.slice(midPoint);

                this.element.innerHTML = `
                    <div class="bg-white rounded-xl p-4 h-full">
                        <!-- Header -->
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-gray-900 text-sm font-bold">${this.title}</h2>
                            
                            <!-- Dropdown -->
                            <div class="relative">
                                <button class="dropdown-button flex items-center gap-1 text-gray-700 text-xs font-medium bg-gray-50 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                                    <span class="selected-option">${this.selectedOption}</span>
                                    <svg class="dropdown-icon w-3 h-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div class="dropdown-menu hidden absolute right-0 mt-1 w-24 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                                    ${this.dropdownOptions.map(option => `
                                        <button class="dropdown-option w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors" data-value="${option}">
                                            ${option}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="flex items-center justify-between gap-4">
                            <!-- Chart -->
                            <div class="flex-shrink-0" style="width: ${this.chartSize}; height: ${this.chartSize};">
                                <div id="${this.elementId}"></div>
                            </div>

                            <!-- Legend - Two Columns -->
                            <div class="flex-1 grid grid-cols-2 gap-x-4 gap-y-2">
                                <!-- Left Column -->
                                <div class="space-y-2">
                                    ${leftModules.map(module => `
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-1.5">
                                                <span class="w-2 h-2 rounded-full flex-shrink-0" style="background-color: ${module.color};"></span>
                                                <span class="text-gray-700 text-xs font-medium">${module.name}</span>
                                            </div>
                                            <span class="text-gray-900 text-xs font-semibold">${module.value}</span>
                                        </div>
                                    `).join('')}
                                </div>

                                <!-- Right Column -->
                                <div class="space-y-2">
                                    ${rightModules.map(module => `
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center gap-1.5">
                                                <span class="w-2 h-2 rounded-full flex-shrink-0" style="background-color: ${module.color};"></span>
                                                <span class="text-gray-700 text-xs font-medium">${module.name}</span>
                                            </div>
                                            <span class="text-gray-900 text-xs font-semibold">${module.value}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            initChart() {
                const totalModules = this.modules.reduce((sum, module) => sum + module.value, 0);
                
                const options = {
                    chart: {
                        type: 'donut',
                        fontFamily: 'Inter, system-ui, sans-serif',
                    },
                    colors: this.modules.map(m => m.color),
                    labels: this.modules.map(m => m.name),
                    series: this.modules.map(m => m.value),
                    dataLabels: {
                        enabled: false,
                    },
                    legend: {
                        show: false,
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                size: '75%',
                                labels: {
                                    show: true,
                                    total: {
                                        show: true,
                                        label: 'Total Module',
                                        fontSize: '10px',
                                        fontWeight: 400,
                                        color: '#9CA3AF',
                                        formatter: function () {
                                            return totalModules;
                                        },
                                    },
                                    value: {
                                        show: true,
                                        fontSize: '22px',
                                        fontWeight: 700,
                                        color: '#111827',
                                        offsetY: -5,
                                    },
                                },
                            },
                        },
                    },
                    stroke: {
                        width: 0,
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + ' modules';
                            },
                        },
                    },
                };

                this.chart = new ApexCharts(document.getElementById(this.elementId), options);
                this.chart.render();
            }

            attachEventListeners() {
                const dropdownButton = this.element.querySelector('.dropdown-button');
                const dropdownMenu = this.element.querySelector('.dropdown-menu');
                const dropdownIcon = this.element.querySelector('.dropdown-icon');
                const selectedOptionSpan = this.element.querySelector('.selected-option');

                // Toggle dropdown
                dropdownButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdownMenu.classList.toggle('hidden');
                    dropdownIcon.classList.toggle('rotate-180');
                });

                // Handle option selection
                this.element.querySelectorAll('.dropdown-option').forEach(option => {
                    option.addEventListener('click', (e) => {
                        this.selectedOption = e.target.dataset.value;
                        selectedOptionSpan.textContent = this.selectedOption;
                        dropdownMenu.classList.add('hidden');
                        dropdownIcon.classList.remove('rotate-180');
                        
                        // Trigger custom event
                        const event = new CustomEvent('optionChanged', { 
                            detail: { option: this.selectedOption } 
                        });
                        this.element.dispatchEvent(event);
                    });
                });

                // Close dropdown when clicking outside
                document.addEventListener('click', () => {
                    dropdownMenu.classList.add('hidden');
                    dropdownIcon.classList.remove('rotate-180');
                });
            }
        }

        // Auto-initialize all charts on page load
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.module-chart').forEach(element => {
                new ModuleDetailsChart(element);
                
                // Optional: Listen to option changes
                element.addEventListener('optionChanged', (e) => {
                    console.log('Chart option changed:', e.detail.option);
                });
            });
        });