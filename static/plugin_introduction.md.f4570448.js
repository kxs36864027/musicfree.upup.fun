import{_ as a,o as e,c as t,Q as s}from"./chunks/framework.ab515e0e.js";const f="/img/plugin-framework.png",o="/img/plugin-list.jpg",n="/img/plugin-content.jpg";const g=JSON.parse('{"title":"插件机制简介","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"plugin/introduction.md","filePath":"plugin/introduction.md","lastUpdated":1700963143000}'),d={name:"plugin/introduction.md"},p=s('<h1 id="插件机制简介" tabindex="-1" data-v-e3b08faf>插件机制简介 <a class="header-anchor" href="#插件机制简介" aria-label="Permalink to &quot;插件机制简介&quot;" data-v-e3b08faf>​</a></h1><h2 id="概述" tabindex="-1" data-v-e3b08faf>概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;" data-v-e3b08faf>​</a></h2><p data-v-e3b08faf>插件机制是本软件的核心。当未安装插件时，本软件可以看作是一个 <strong data-v-e3b08faf>本地的音乐播放器</strong>；当安装插件之后，你便可以为这个播放器 <strong data-v-e3b08faf>扩展你自定义的音源</strong>。本文档便是开发插件的详细教程。</p><p data-v-e3b08faf>软件中的任何和音乐有关的 <strong data-v-e3b08faf> 底层功能 </strong>，包括但不限于播放、搜索、查看专辑信息、查看歌词、导入歌单等，都是基于 <strong data-v-e3b08faf>插件</strong> 实现的。</p><div class="tip custom-block" data-v-e3b08faf><p class="custom-block-title" data-v-e3b08faf>💡</p><p data-v-e3b08faf>因此，如果某个音源存在问题（比如无法播放、没有导入歌单等功能），那大概率是插件有问题。</p></div><p data-v-e3b08faf><strong data-v-e3b08faf>软件会决定在什么时候去调用插件中的某个方法，以及如何处理方法返回的数据</strong>；插件负责根据入参获取或处理特定格式的数据。软件中播放本地音乐功能实际上也是通过加载一个特殊的内置插件实现。</p><div class="img-container" data-v-e3b08faf><img src="'+f+`" data-v-e3b08faf></div><h2 id="前置知识" tabindex="-1" data-v-e3b08faf>前置知识 <a class="header-anchor" href="#前置知识" aria-label="Permalink to &quot;前置知识&quot;" data-v-e3b08faf>​</a></h2><p data-v-e3b08faf>开发插件前，你需要了解以下知识：</p><ul data-v-e3b08faf><li data-v-e3b08faf>javascript / typescript (ES7 语法)</li><li data-v-e3b08faf>js 模块化规范 (common.js)</li><li data-v-e3b08faf>包管理工具 npm，以及如何使用 npm 包</li><li data-v-e3b08faf>构建工具（webpack、parcel，可选）</li><li data-v-e3b08faf>JSBridge（可选）</li></ul><h2 id="原理" tabindex="-1" data-v-e3b08faf>原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;" data-v-e3b08faf>​</a></h2><h4 id="插件的本质" tabindex="-1" data-v-e3b08faf>插件的本质 <a class="header-anchor" href="#插件的本质" aria-label="Permalink to &quot;插件的本质&quot;" data-v-e3b08faf>​</a></h4><p data-v-e3b08faf>插件本质上是一个 <strong data-v-e3b08faf>导出特定数据结构</strong> 的 <code data-v-e3b08faf>Common JS 模块</code>。如果你开发过前端项目，并且配置过 <code data-v-e3b08faf>webpack.config.js</code>，你可能会对开发插件的方式感到熟悉。</p><p data-v-e3b08faf>插件中的配置可以大体分为两类：一类是用来说明插件信息的 <strong data-v-e3b08faf>属性</strong>（比如插件名、插件的版本号）；另一类是让软件在合适的时机调用的 <strong data-v-e3b08faf>函数</strong>（比如获取音源的函数等）。</p><p data-v-e3b08faf>在软件中的每一项动作 （如获取音源 URL、搜索等），<strong data-v-e3b08faf>都对应着插件中导出的某个函数</strong> （比如 <code data-v-e3b08faf>获取音源</code> 对应着 <code data-v-e3b08faf>getMediaSource</code> 函数，<code data-v-e3b08faf>搜索</code> 对应着 <code data-v-e3b08faf>search</code> 函数）。</p><p data-v-e3b08faf>一个简单的插件结构如下：</p><div class="language-javascript vp-adaptive-theme" data-v-e3b08faf><button title="Copy Code" class="copy" data-v-e3b08faf></button><span class="lang" data-v-e3b08faf>javascript</span><pre class="shiki github-dark vp-code-dark" data-v-e3b08faf><code data-v-e3b08faf><span class="line" data-v-e3b08faf><span style="color:#79B8FF;" data-v-e3b08faf>module</span><span style="color:#E1E4E8;" data-v-e3b08faf>.</span><span style="color:#79B8FF;" data-v-e3b08faf>exports</span><span style="color:#E1E4E8;" data-v-e3b08faf> </span><span style="color:#F97583;" data-v-e3b08faf>=</span><span style="color:#E1E4E8;" data-v-e3b08faf> {</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>  </span><span style="color:#6A737D;" data-v-e3b08faf>/** 用来说明插件信息的属性 */</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>  platform: </span><span style="color:#9ECBFF;" data-v-e3b08faf>&quot;MusicFree 插件&quot;</span><span style="color:#E1E4E8;" data-v-e3b08faf>, </span><span style="color:#6A737D;" data-v-e3b08faf>// 插件名</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>  version: </span><span style="color:#9ECBFF;" data-v-e3b08faf>&quot;0.0.0&quot;</span><span style="color:#E1E4E8;" data-v-e3b08faf>, </span><span style="color:#6A737D;" data-v-e3b08faf>// 插件版本号</span></span>
<span class="line" data-v-e3b08faf></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>  </span><span style="color:#6A737D;" data-v-e3b08faf>/** 供给软件在合适的时机调用的函数 */</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>  </span><span style="color:#B392F0;" data-v-e3b08faf>getMediaSource</span><span style="color:#E1E4E8;" data-v-e3b08faf>: </span><span style="color:#F97583;" data-v-e3b08faf>function</span><span style="color:#E1E4E8;" data-v-e3b08faf> (</span><span style="color:#FFAB70;" data-v-e3b08faf>musicItem</span><span style="color:#E1E4E8;" data-v-e3b08faf>) {</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>    </span><span style="color:#6A737D;" data-v-e3b08faf>// 根据该音源的某个音乐获取真实的播放地址</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>    </span><span style="color:#F97583;" data-v-e3b08faf>return</span><span style="color:#E1E4E8;" data-v-e3b08faf> {</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>      url: </span><span style="color:#9ECBFF;" data-v-e3b08faf>&quot;https://&quot;</span><span style="color:#E1E4E8;" data-v-e3b08faf>, </span><span style="color:#6A737D;" data-v-e3b08faf>// 音源 URL</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>    };</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>  },</span></span>
<span class="line" data-v-e3b08faf><span style="color:#E1E4E8;" data-v-e3b08faf>};</span></span></code></pre><pre class="shiki github-light vp-code-light" data-v-e3b08faf><code data-v-e3b08faf><span class="line" data-v-e3b08faf><span style="color:#005CC5;" data-v-e3b08faf>module</span><span style="color:#24292E;" data-v-e3b08faf>.</span><span style="color:#005CC5;" data-v-e3b08faf>exports</span><span style="color:#24292E;" data-v-e3b08faf> </span><span style="color:#D73A49;" data-v-e3b08faf>=</span><span style="color:#24292E;" data-v-e3b08faf> {</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>  </span><span style="color:#6A737D;" data-v-e3b08faf>/** 用来说明插件信息的属性 */</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>  platform: </span><span style="color:#032F62;" data-v-e3b08faf>&quot;MusicFree 插件&quot;</span><span style="color:#24292E;" data-v-e3b08faf>, </span><span style="color:#6A737D;" data-v-e3b08faf>// 插件名</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>  version: </span><span style="color:#032F62;" data-v-e3b08faf>&quot;0.0.0&quot;</span><span style="color:#24292E;" data-v-e3b08faf>, </span><span style="color:#6A737D;" data-v-e3b08faf>// 插件版本号</span></span>
<span class="line" data-v-e3b08faf></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>  </span><span style="color:#6A737D;" data-v-e3b08faf>/** 供给软件在合适的时机调用的函数 */</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>  </span><span style="color:#6F42C1;" data-v-e3b08faf>getMediaSource</span><span style="color:#24292E;" data-v-e3b08faf>: </span><span style="color:#D73A49;" data-v-e3b08faf>function</span><span style="color:#24292E;" data-v-e3b08faf> (</span><span style="color:#E36209;" data-v-e3b08faf>musicItem</span><span style="color:#24292E;" data-v-e3b08faf>) {</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>    </span><span style="color:#6A737D;" data-v-e3b08faf>// 根据该音源的某个音乐获取真实的播放地址</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>    </span><span style="color:#D73A49;" data-v-e3b08faf>return</span><span style="color:#24292E;" data-v-e3b08faf> {</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>      url: </span><span style="color:#032F62;" data-v-e3b08faf>&quot;https://&quot;</span><span style="color:#24292E;" data-v-e3b08faf>, </span><span style="color:#6A737D;" data-v-e3b08faf>// 音源 URL</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>    };</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>  },</span></span>
<span class="line" data-v-e3b08faf><span style="color:#24292E;" data-v-e3b08faf>};</span></span></code></pre></div><p data-v-e3b08faf>关于插件在代码中的实现细节可以 <a href="https://mp.weixin.qq.com/s/pjyOjTDrV85ImRQ6EWbgAg" target="_blank" rel="noreferrer" data-v-e3b08faf>参考这里</a>。桌面版的实现机制和安卓版略有差异，但基本原理相同。</p><h4 id="插件加载的原理" tabindex="-1" data-v-e3b08faf>插件加载的原理 <a class="header-anchor" href="#插件加载的原理" aria-label="Permalink to &quot;插件加载的原理&quot;" data-v-e3b08faf>​</a></h4><p data-v-e3b08faf>之前说过，MusicFree 的插件其实是满足某种规范的 js 文件，它独立于软件存在，<strong data-v-e3b08faf>软件启动的时候会去特定的文件夹下搜索 js 文件，并加载到程序中。</strong></p><p data-v-e3b08faf>以手机版为例，程序中存储插件的路径是 <code data-v-e3b08faf>Android/data/{包名}/files/plugins</code>。</p><p data-v-e3b08faf>MusicFree 的包名是 <code data-v-e3b08faf>fun.upup.musicfree</code>，所以你可以尝试打开一下手机文件管理的 <code data-v-e3b08faf>Android/data/fun.upup.musicfree/files/plugins</code> 路径，你会发现一系列 <code data-v-e3b08faf>xxx.js</code> 文件。</p><div class="img-container" data-v-e3b08faf><img src="`+o+'" data-v-e3b08faf></div><p data-v-e3b08faf>如果想要查看具体内容的话，你可以把后缀名改成 <code data-v-e3b08faf>.txt</code>，并打开（记得改回去）。</p><div class="img-container" data-v-e3b08faf><img src="'+n+'" data-v-e3b08faf></div><p data-v-e3b08faf>可以看到 <code data-v-e3b08faf>module.exports</code> 有一些字段，这些其实都和程序中一一对应，比如 <code data-v-e3b08faf>platform</code> 代表这个插件的名字，<code data-v-e3b08faf>version</code> 代表这个插件的版本号，以及如果有 <code data-v-e3b08faf>srcUrl</code> 字段的话，那么这就是用于插件更新的远程地址。</p><p data-v-e3b08faf>插件的加载逻辑做的比较重，因此对于基于 MusicFree 开发的软件，如果不做大的改动，插件大概率也会以<strong data-v-e3b08faf>本地文件</strong>的形式存储在 <code data-v-e3b08faf>Android/data/{包名}/files/plugins</code> 路径下，并且也可以被 MusicFree 加载。</p><div class="tip custom-block" data-v-e3b08faf><p class="custom-block-title" data-v-e3b08faf>总结</p><p data-v-e3b08faf>已安装的插件实际上是被拷贝到了固定路径，安卓是 <code data-v-e3b08faf>Android/data/fun.upup.musicfree/files/plugins</code>；桌面端是 <code data-v-e3b08faf>C://Users/{userName}/AppData/Roaming/MusicFree/musicfree-plugins</code>。每次启动应用时，都会从对应路径下扫描并加载插件。</p></div><h4 id="插件安装的原理" tabindex="-1" data-v-e3b08faf>插件安装的原理 <a class="header-anchor" href="#插件安装的原理" aria-label="Permalink to &quot;插件安装的原理&quot;" data-v-e3b08faf>​</a></h4><p data-v-e3b08faf>插件安装时，首先会检测当前有没有安装过同名插件。所谓同名，就是指 <code data-v-e3b08faf>platform</code> 字段相同，如果相同就会认为是同一个插件。</p><p data-v-e3b08faf>接下来，会去根据插件的 <code data-v-e3b08faf>version</code> 字段对比版本。如果本地已经存在更新版本 (要安装的版本号小于本地版本号) 的插件，那么插件会安装失败。</p><p data-v-e3b08faf>版本号是类似于 <code data-v-e3b08faf>1.2.3</code> 的形式，比较的时候从后往前比，比如 <code data-v-e3b08faf>1.2.4 &gt; 1.2.3</code>，<code data-v-e3b08faf>2.0.0 &gt; 1.99.99</code>。<strong data-v-e3b08faf>因此，如果要安装旧版本的插件，需要先卸载本地的更新版本的插件，然后再安装旧版。</strong></p><p data-v-e3b08faf>如果以上验证通过，那么接下来就开始安装插件了。安装的过程就是往存储插件的路径里写入一个 <code data-v-e3b08faf>js</code> 文件，为了避免冲突，这个文件的名字会<strong data-v-e3b08faf>随机生成</strong>。</p><h2 id="生命周期" tabindex="-1" data-v-e3b08faf>生命周期 <a class="header-anchor" href="#生命周期" aria-label="Permalink to &quot;生命周期&quot;" data-v-e3b08faf>​</a></h2><p data-v-e3b08faf>插件在被加载或软件启动时，会自动执行插件函数的函数体，并将插件的模块导出（module.exports）作为插件的实例。</p><p data-v-e3b08faf>插件实例和插件中的数据会在软件的生命周期内<strong data-v-e3b08faf>持续存在</strong>，直至软件或者插件被卸载。</p><h2 id="插件的性能" tabindex="-1" data-v-e3b08faf>插件的性能 <a class="header-anchor" href="#插件的性能" aria-label="Permalink to &quot;插件的性能&quot;" data-v-e3b08faf>​</a></h2><p data-v-e3b08faf>插件执行的上下文和软件内（无论是桌面版还是安卓版） Javascript 代码执行的上下文相同，因此性能方面理论上和软件内直接写死源 <strong data-v-e3b08faf>无差别</strong>。</p><div class="danger custom-block" data-v-e3b08faf><p class="custom-block-title" data-v-e3b08faf>DANGER</p><p data-v-e3b08faf>也正因如此，插件内有可能会有些破坏软件本体执行的逻辑，因此插件的使用者需要谨慎识别插件的来源。</p></div><details class="details custom-block" data-v-e3b08faf><summary data-v-e3b08faf>为什么要这样设计？</summary><p data-v-e3b08faf>尽管在安全性上有弱点，但是这样做没有额外的序列化和反序列化步骤，性能会好一点点；同时设计之初以技术探索为主，没有太多安全性上的考虑。</p><p data-v-e3b08faf>再者，插件是用 javascript 编写，简单看一下插件内容也能大概判断插件的安全性，因此暂时保持这样的设计，后续如果有需求再逐渐完善。</p></details><h2 id="如何开发插件" tabindex="-1" data-v-e3b08faf>如何开发插件 <a class="header-anchor" href="#如何开发插件" aria-label="Permalink to &quot;如何开发插件&quot;" data-v-e3b08faf>​</a></h2><p data-v-e3b08faf>对于开发方式没有限制，你只需要保证最终生成一个 <code data-v-e3b08faf>导出 MusicFree 协议</code> 的 <code data-v-e3b08faf>Common.js</code> 模块即可。</p><p data-v-e3b08faf>方便起见，你可以按照 <a href="https://github.com/maotoumao/MusicFreePluginTemplate" target="_blank" rel="noreferrer" data-v-e3b08faf>此模板</a> 完善插件。开发完成后，执行：</p><div class="language-bash vp-adaptive-theme" data-v-e3b08faf><button title="Copy Code" class="copy" data-v-e3b08faf></button><span class="lang" data-v-e3b08faf>bash</span><pre class="shiki github-dark vp-code-dark" data-v-e3b08faf><code data-v-e3b08faf><span class="line" data-v-e3b08faf><span style="color:#B392F0;" data-v-e3b08faf>npm</span><span style="color:#E1E4E8;" data-v-e3b08faf> </span><span style="color:#9ECBFF;" data-v-e3b08faf>run</span><span style="color:#E1E4E8;" data-v-e3b08faf> </span><span style="color:#9ECBFF;" data-v-e3b08faf>build</span></span></code></pre><pre class="shiki github-light vp-code-light" data-v-e3b08faf><code data-v-e3b08faf><span class="line" data-v-e3b08faf><span style="color:#6F42C1;" data-v-e3b08faf>npm</span><span style="color:#24292E;" data-v-e3b08faf> </span><span style="color:#032F62;" data-v-e3b08faf>run</span><span style="color:#24292E;" data-v-e3b08faf> </span><span style="color:#032F62;" data-v-e3b08faf>build</span></span></code></pre></div><p data-v-e3b08faf>安装 <code data-v-e3b08faf>dist/plugin.js</code> 即可。</p><p data-v-e3b08faf>除了使用模板外，你也可以基于 <a href="https://github.com/maotoumao/MusicFreePlugins" target="_blank" rel="noreferrer" data-v-e3b08faf>示例插件</a> 修改。示例插件仓库最终的可安装文件在 <code data-v-e3b08faf>dist</code> 文件夹下。</p><h2 id="如何调试插件" tabindex="-1" data-v-e3b08faf>如何调试插件 <a class="header-anchor" href="#如何调试插件" aria-label="Permalink to &quot;如何调试插件&quot;" data-v-e3b08faf>​</a></h2><p data-v-e3b08faf>前面说过，插件本质上是一个导出特定数据结构的 <code data-v-e3b08faf>Common JS 模块</code>。如果需要调试插件，你只需要在 node.js 环境下调用对应的函数，判断函数的返回值是否符合预期即可。</p><div class="warning custom-block" data-v-e3b08faf><p class="custom-block-title" data-v-e3b08faf>WARNING</p><p data-v-e3b08faf>如果使用到 <code data-v-e3b08faf>@react-native-cookies/cookies</code>，无法直接在 node.js 环境下调试，因为这个包有一些原生依赖。如果需要调试，需要启动 MusicFree 项目，并在软件内调试。</p></div><div class="danger custom-block" data-v-e3b08faf><p class="custom-block-title" data-v-e3b08faf>DANGER</p><p data-v-e3b08faf>同样需要注意，插件内可以引入第三方库 (比如你想在插件中使用 lodash 等)，但插件内只能引入 <span style="color:var(--vp-c-danger-1);" data-v-e3b08faf>纯 Javascript 库</span>，如果第三方库存在一些原生依赖，则无法使用。</p></div><hr data-v-e3b08faf><p data-v-e3b08faf>接下来，你可以简单阅读一下 <a href="/plugin/basic-type.html" data-v-e3b08faf>基本媒体类型</a> 一节，大概了解一下插件内部的一些通用的数据结构，然后就可以根据插件协议开发了。</p>',52),l=[p];function c(b,r,v,i,u,E){return e(),t("div",null,l)}const h=a(d,[["render",c],["__scopeId","data-v-e3b08faf"]]);export{g as __pageData,h as default};
