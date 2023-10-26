<template>
  <div class="Timbre">
    <h1>音色收集</h1>
    <div class="buttonArea">
      <button v-for="(key, i) in Object.keys(timbres)" :key="i" @click="handleClickTimbres(key)">{{ key }}</button>
    </div>
    <div class="kindArea">
      <h2>{{ currentSelectTimbres }}</h2>
      <table>
        <thead>
          <tr>
            <th>软件</th>
            <th>名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in timbres[currentSelectTimbres]" :key="idx">
            <td>{{ item.software }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.describe }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    handleClickTimbres(name: string) {
      this.currentSelectTimbres = name;
    }
  },
  data() {
    const cubase = 'Cubase/HALion Sonic SE';
    const cubase2 = 'Cubase/Prologue';
    const kuYueDui = '库乐队';
    const MuseScore4 = 'MuseScore4';

    return {
      currentSelectTimbres: 'guitar',
      timbres: {
        guitar: [
          {
            name: 'Steel Guitar',
            software: cubase,
            describe: '一般',
          },
          {
            name: 'Clean Guitar',
            software: cubase,
            describe: '还行',
          },
          {
            name: 'Nylon Guitar',
            software: cubase,
            describe: '声音稍微闷有一点',
          },
          {
            name: 'Bright Steel Guitar',
            software: cubase,
            describe: '稍微好听一点的吉他',
          },
          {
            name: 'Electric Guitar',
            software: cubase,
            describe: '没有弦音的吉他，感觉少了点东西',
          },
          {
            name: 'Chorus Electric Guitar',
            software: cubase,
            describe: '比上面好像更好一点',
          },
          {
            name: 'Banjo',
            software: cubase,
            describe: '感觉像是弹皮筋，搞笑',
          },
          {
            name: 'Shamisen',
            software: cubase,
            describe: '音特别短的吉他',
          },
          {
            name: 'Nylon Finger Picking',
            software: cubase,
            describe: '自带手演奏，有点nb',
          },
        ],
        strings: [
          {
            name: 'spiccato soloists',
            software: cubase,
            describe: '断奏',
          },
          {
            name: 'String Ensemble',
            software: cubase,
            describe: '小提琴组',
          },
          {
            name: 'Big Symphony Strings',
            software: cubase,
            describe: '比较雄厚低沉的小提琴组',
          },
          {
            name: 'Chamber Strings',
            software: cubase,
            describe: '稍微正常一点的小提琴',
          },
          {
            name: 'Ensemble Strings',
            software: cubase,
            describe: '音调高一点的小提琴组',
          },
          {
            name: 'Bell Strings',
            software: cubase,
            describe: '铃声和弦乐器的混响',
          },
          {
            name: 'FlexPhrased Pizzicatos',
            software: cubase,
            describe: '坎巴拉太空计划里的乐器',
          },
          {
            name: 'Wheel String 1',
            software: cubase2,
            describe: '柔和小提琴电音',
          },
          {
            name: 'Wheel String 2',
            software: cubase2,
            describe: '窜天猴小提琴电音',
          },
        ],
        vocal: [
          {
            name: '声乐/女声合唱乐句变形/人声拨弹',
            software: kuYueDui,
            describe: '效果不错',
          },
          {
            name: '声乐/炼金术士合唱',
            software: kuYueDui,
            describe: '非常神圣，但调不太容易搭配',
          },
          {
            name: '声乐/深沉和声波形/金属泛音',
            software: kuYueDui,
            describe: '像粘粘世界里的神圣感',
          },
          {
            name: 'Heavenly Voices',
            software: cubase,
            describe: ''
          },
          {
            name: 'choir Aahs',
            software: cubase,
            describe: ''
          },
          {
            name: 'New Age Choir NoteExp',
            software: cubase,
            describe: ''
          },
          {
            name: 'Angels & Strings NoteExp',
            software: cubase,
            describe: '像天使一样'
          },
        ],
        piano: [
          {
            name: 'TX Digital Piano',
            software: cubase,
            describe: ''
          },
          {
            name: 'Fx 4 Atmosphere',
            software: cubase,
            describe: '环境音很好的钢琴一样的音'
          },
          {
            name: 'Bright Acoustic Piano ',
            software: cubase,
            describe: '通用钢琴，亮一些'
          },
          {
            name: 'harpsichord',
            software: cubase,
            describe: '羽管钢琴'
          },
          {
            name: 'Two Synths',
            software: cubase,
            describe: '很像金属里的键盘，很不错'
          },
        ],
        organ: [
          {
            name: 'accordion',
            software: cubase,
            describe: '手风琴'
          },
          {
            name: 'an organ',
            software: cubase,
            describe: '有点酷的管风琴，声音有点大'
          },
          {
            name: 'Drawbar Organ',
            software: cubase,
            describe: '声音低沉并小的风琴，比较和谐'
          },
          {
            name: 'harmonica',
            software: cubase,
            describe: '口琴'
          },
          {
            name: 'An Organic',
            software: cubase,
            describe: '很正经的合成声音'
          },
          {
            name: 'Harmonic Pad',
            software: cubase2,
            describe: '管风琴的声音，就是混响太大了'
          },
          {
            name: 'Higher Ground',
            software: cubase2,
            describe: '纪念碑谷的感觉'
          },
          {
            name: 'Organ',
            software: cubase2,
            describe: '有点单调的管风琴'
          },
          {
            name: 'Organdhi',
            software: cubase2,
            describe: '稍微和谐了一点'
          },

        ],
        woodwind: [
          {
            name: '主音/现代节奏布鲁斯主音',
            software: kuYueDui,
            describe: '电子合成器像笛子，适合悲怆'
          },
          {
            name: 'Recorder',
            software: cubase,
            describe: '适合solo'
          },
          {
            name: 'Bright Flute NoteExp',
            software: cubase,
            describe: '不错的笛子，就是不支持颤音'
          },
          {
            name: 'piccolo',
            software: cubase,
            describe: '短笛  音高'
          },
          {
            name: 'Ethnic Flute',
            software: cubase,
            describe: '竹笛'
          },
          {
            name: 'Drawbar Flutes',
            software: cubase,
            describe: '笛子的背景音，可以用来叠音色增强'
          },
          {
            name: 'oboe',
            software: cubase,
            describe: '双簧管(啊~~）'
          },
          {
            name: 'clarinet',
            software: cubase,
            describe: '单簧管（乌~~）音域比双簧管广'
          },
          {
            name: 'bassoon',
            software: cubase,
            describe: '巴松管 低音'
          },
          {
            name: 'Amped Blues Harp NoteExp',
            software: cubase,
            describe: '有点像笛子，还行'
          },
          {
            name: 'A Small Square',
            software: cubase2,
            describe: '有点像笛子的电音'
          },
          {
            name: 'Apple Fields',
            software: cubase2,
            describe: '有点像笛子的，比较低，稍微一点点忧伤'
          },
          {
            name: 'Flutingarp',
            software: cubase2,
            describe: '呜呜的笛子'
          },
        ],
        brass: [
          // 铜管
          {
            name: '背景音/模拟丝滑',
            software: kuYueDui,
            describe: '相当于是把铜管电音化了，还不错'
          },
          {
            name: 'trumpet',
            software: cubase,
            describe: '小号'
          },
          {
            name: 'french horn',
            software: cubase,
            describe: '法国号  圆号'
          },
          {
            name: 'trombone',
            software: cubase,
            describe: '长号“今天妈妈不在家”'
          },
          {
            name: 'tuba',
            software: cubase,
            describe: '低音号'
          },
          {
            name: 'Analog Orkestra',
            software: cubase2,
            describe: '圆滑的悠扬声音'
          },
          {
            name: 'Analog Voice',
            software: cubase2,
            describe: '相比上一个单调一些'
          },
          {
            name: 'Dark Pad',
            software: cubase2,
            describe: '黎明前的略微悠扬感觉'
          },

        ],
        idiophones: [
          {
            name: 'Tinkle Bell',
            software: cubase,
            describe: '很清亮的铃铛声'
          },
          {
            name: 'Fx 3(Crystal)',
            software: cubase,
            describe: '水晶'
          },
          {
            name: 'Marimba',
            software: cubase,
            describe: '马林巴琴 iPhone手机铃声，小木锤'
          },
          {
            name: 'xylophone',
            software: cubase,
            describe: '比马林巴琴音调更高，清脆'
          },
          {
            name: 'vibraphone',
            software: cubase,
            describe: '铁琴，更接近于水晶'
          },
          {
            name: 'Glockenspiel',
            software: cubase,
            describe: '高音铁琴'
          },
          {
            name: 'Vintage digital Tines',
            software: cubase,
            describe: '很好听的铃声'
          },
          {
            name: 'Kling Klang',
            software: cubase2,
            describe: '非常短音的小铃铛'
          },
          {
            name: 'Reso Plink',
            software: cubase2,
            describe: '有点像吹口哨的小铃铛'
          },
          {
            name: 'Wooden Perc',
            software: cubase2,
            describe: '柔和马林巴琴'
          },
        ],
        harp: [
          {
            name: 'Harp',
            software: cubase,
            describe: '竖琴'
          }
        ],
        specialEffect: [
          {
            name: '声音效果/巨大震撼',
            software: kuYueDui,
            describe: '非常震撼的打击声音'
          },
          {
            name: '声音效果/机械提升器',
            software: kuYueDui,
            describe: '情绪提升暂停的时候插入不错'
          },
          {
            name: '声音效果/漩涡提升器/圆号提升器',
            software: kuYueDui,
            describe: '高音部分长按会有海豚音的震撼效果'
          },
          {
            name: 'Cymbal',
            software: cubase,
            describe: '爆发前的吸一口气 C3'
          },
          {
            name: 'Anarise',
            software: cubase,
            describe: '神秘上浮的滑音'
          },
          {
            name: 'Synthetic Bomb',
            software: cubase2,
            describe: '爆炸声，特殊音效'
          },
          {
            name: 'Wah Repeater',
            software: cubase2,
            describe: '“哇哇”的声音'
          },
          {
            name: 'Steam Storm',
            software: cubase2,
            describe: '纯粹寒风声'
          },
          {
            name: 'Bubble Wheel',
            software: cubase2,
            describe: '西游记音效啾啾啾'
          },
        ],
        bass: [
          {
            name: '低音/怒放低音',
            software: kuYueDui,
            describe: '很牛的Bass，还有汽车人的声音'
          },
          {
            name: '低音/巨大合成低音',
            software: kuYueDui,
            describe: '超级bass'
          },
          {
            name: '低音/暗流/锐舞客',
            software: kuYueDui,
            describe: '超级帅的Bass'
          },
          {
            name: 'Voyager Bass',
            software: cubase,
            describe: ' [C3附近很好] 非常有弹性'
          },

          {
            name: 'Acoustic Bass',
            software: cubase,
            describe: '【C1~C2内】'
          },
          {
            name: 'Red Band',
            software: cubase,
            describe: '（有点拖沓）'
          },
          {
            name: 'JungleBass',
            software: cubase2,
            describe: '左右耳道来回跳跃的bass低音'
          },
          {
            name: 'Brett Bass',
            software: cubase2,
            describe: '颗粒感十足的bass电音'
          },
          {
            name: 'Club Bass',
            software: cubase2,
            describe: '超级低音bass'
          },

        ],
        electronic: [
          {
            name: '合成器/南极阳光',
            software: kuYueDui,
            describe: '超级温柔',
          },
          {
            name: '键盘？/小旋风',
            software: kuYueDui,
            describe: '比较软萌萌可爱的电子感',
          },
          {
            name: '合成器/明亮增音合成器',
            software: kuYueDui,
            describe: '帅帅的电音',
          },
          {
            name: 'Sour Wine',
            software: cubase,
            describe: '（来自做乐园过山车的时候）'
          },
          {
            name: 'The Cry',
            software: cubase,
            describe: '十分不连续  时不时来个抽风'
          },
          {
            name: 'Burning Thorn',
            software: cubase,
            describe: '快节奏主旋律电音,不好听'
          },
          {
            name: 'Mondo Drone',
            software: cubase,
            describe: '[C5+]  沙哑'
          },
          {
            name: 'Power Chords Strat',
            software: cubase,
            describe: '[C1 C2]  有点跑调'
          },
          {
            name: 'R&B Lead',
            software: cubase,
            describe: '尖叫高音   GTA感觉'
          },
          {
            name: 'Meta Runner',
            software: cubase,
            describe: '有跑酷的感觉'
          },
          {
            name: 'Drive Sync',
            software: cubase,
            describe: '很带感但声音太大'
          },
          {
            name: 'Digiride',
            software: cubase,
            describe: '混乱电子空间'
          },
          {
            name: 'Cyclops',
            software: cubase,
            describe: '经常拉长调'
          },
          {
            name: 'Club Mad',
            software: cubase,
            describe: '冷静一些但混响有点大  C2附近有点小帅(早期比特山)'
          },
          {
            name: 'Bitrate Euphoria',
            software: cubase,
            describe: '一般'
          },
          {
            name: 'Bit Liquids',
            software: cubase,
            describe: '啊呀呀呀'
          },
          {
            name: 'Bit Blip',
            software: cubase,
            describe: '数据快速穿梭的声音'
          },
          {
            name: 'Airmail',
            software: cubase,
            describe: '有点牛逼的电子自带旋律'
          },
          {
            name: 'Adorned',
            software: cubase,
            describe: '冷静的数据'
          },
          {
            name: 'Whispering Pad',
            software: cubase,
            describe: '哇哦'
          },
          {
            name: 'The Dream Garden',
            software: cubase,
            describe: '数据雨，比较单调'
          },
          {
            name: 'Evacuate Comp',
            software: cubase,
            describe: '沙哑的声音'
          },
          {
            name: 'Big Lead',
            software: cubase2,
            describe: '大电音'
          },
          {
            name: 'Big Sleazy',
            software: cubase2,
            describe: '大大的沙哑电音，虫虫大作战'
          },
          {
            name: 'Brassica',
            software: cubase2,
            describe: '有点像喇叭的电音'
          },
          {
            name: 'Choco Foil',
            software: cubase2,
            describe: '巨大滴头+电音'
          },
          {
            name: 'Square Lead',
            software: cubase2,
            describe: '方波有点刺耳'
          },
          {
            name: 'Very Old Sequins',
            software: cubase2,
            describe: '比上面好多了'
          },
        ],
        background: [
          {
            name: '音景/加速粒子',
            software: kuYueDui,
            describe: '宇宙感觉'
          },
          {
            name: '音景/氛围感漂移',
            software: kuYueDui,
            describe: '很柔和，像minecraft'
          },
          {
            name: '音景/氛围感吉他',
            software: kuYueDui,
            describe: '神韵'
          },
          {
            name: '音景/水产业',
            software: kuYueDui,
            describe: '地狱边境-> 温暖扫弦'
          },
          {
            name: '音景/陆内日落',
            software: kuYueDui,
            describe: '巨大苍凉悲伤感'
          },
          {
            name: '音景/天文学家',
            software: kuYueDui,
            describe: '宇宙巨大空间感'
          },
          {
            name: 'Ring House',
            software: cubase,
            describe: '环境音很好'
          },
          {
            name: '1990s Synth Strings',
            software: cubase,
            describe: '电影级别音效 适合做长音，带比较多的电子合成味道'
          },
          {
            name: 'Frozen Lake',
            software: cubase,
            describe: '?'
          },
        ],
        electronicGuitar: [
          {
            name: 'overdrive Guitar',
            software: cubase,
            describe: '电吉他（音量大了过载）'
          },
          {
            name: 'Distortion Guitar',
            software: cubase,
            describe: '电吉他（失真）'
          },
          {
            name: 'Heavy Metal Mutes',
            software: cubase,
            describe: '电吉他'
          },
          {
            name: 'Power Chords Strat',
            software: cubase,
            describe: '电吉他'
          },
        ],
        hit: [
          {
            name: 'Dirty Hit',
            software: cubase,
            describe: '商场搞活动促销（）'
          },
          {
            name: 'Orchestral Hits',
            software: cubase,
            describe: '雷人'
          },
          {
            name: 'Storm Drum',
            software: cubase,
            describe: '【C2~C4】'
          },

        ],
        strange: [
          {
            name: 'Tremolo Electric Piano',
            software: cubase,
            describe: '尖锐危机感'
          },
          {
            name: 'Lucky Man',
            software: cubase,
            describe: '尖锐危机感'
          },
          {
            name: 'Pulse Modular',
            software: cubase,
            describe: '（duangduangduang）'
          },
          {
            name: 'Tech Scream',
            software: cubase,
            describe: '尖叫，搞笑'
          },
          {
            name: 'FX Snares',
            software: cubase,
            describe: '啾啾啾的枪战声'
          },
          {
            name: 'Sync Panner',
            software: cubase,
            describe: '回旋声音'
          },
          {
            name: 'Synbreeze',
            software: cubase,
            describe: '有好多像小猫“baobao”的回旋声'
          },
        ],
        drum: [
          {
            name: 'All Kick Drums',
            software: cubase,
            describe: '快速打击的节奏鼓'
          },
          {
            name: 'Taiko Drum',
            software: cubase,
            describe: '很正常的鼓'
          },
          {
            name: 'Rock Kit',
            software: cubase,
            describe: '低音比较震撼  【4（0） 是快速鼓点】'
          },
          {
            name: 'Rock Multi',
            software: cubase,
            describe: '架子鼓'
          },
          {
            name: 'Taiko Drum',
            software: cubase,
            describe: '有点单调的鼓'
          },
          {
            name: 'percussion',
            software: cubase,
            describe: '快节奏尖锐的小鼓点，pvz里发现的'
          },
          {
            name: 'Timpani',
            software: cubase,
            describe: '定音鼓，每个键都是鼓声，没有其他的'
          },
          {
            name: 'Storm Drum',
            software: cubase,
            describe: '【C2~C4】'
          },
        ]
      },
    }
  }
}
</script>

<style lang="scss">
.Timbre {
  overflow: auto;

  h1 {
    text-align: center;
  }

  .buttonArea {
    width: 90%;
    margin: 0 auto;

    button {
      margin: 5px;
      cursor: pointer;
    }
  }

  .kindArea {
    width: 90%;
    margin: 0 auto;

    h2 {
      color: skyblue;
    }

    table {
      width: 100%;
      line-height: 1.5em;

      thead {
        text-align: left;
        background-color: #1e1e1e;
        color: white;
      }

      tbody {
        tr:nth-child(even) {
          background-color: #2b2b2b;
        }
      }

      tr {}
    }
  }


}
</style>