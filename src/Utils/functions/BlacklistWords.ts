import { Message } from "discord.js";

export default function BlacklistWords(msg: Message) {
  if(msg.content.match(/alguém namora/gi)) {
    return msg.reply({
      embeds: [{
        title: 'Estou solteiro, baby',
        description: 'Não sei como responder, mas você pode me chamar de **"namorado"** ou **"casado"** se preferir.\nMas prefiro ser chamado de amante ou ficante pra ter mais de 1 pessoa para formar trio romance',
      }]
    })
  }

  if(['gf', 'gozofone'].some(x => msg.content.toLowerCase().includes(x))) {
    msg.delete();
    msg.channel.send({
      content: `<@${msg.author.id}>`,
      embeds:[{
        title: `CARENTE FOI DETECTADO COM SUCESSO!`,
        color: 0xFFFF50,
        description: `**Tem coisa melhor que fazer GF**...\nOuvir a voz da pessoa que é magnifico, ver série, ver filme, fazer caminhada na rua, jogar joguinhos, ler livros, estudar pro curso, praticar e entre outros...`,
      }]
    }).then(msg => {
      setTimeout(() => { msg.delete(); }, 5000);
    })
  }

  if(['sexo', 'safada', 'me come', 'vibrador', 'pau de borracha', 'transar', 'mama'].some(x => msg.content.toLowerCase().includes(x))) {
    msg.delete();
    msg.channel.send({
      content: `<@${msg.author.id}>`,
      embeds: [{
        color: 0x000000,
        title: '🔞 ANTI-PUTARIA',
        description: 'Não é mais permitido falar de **ATOS LIBIDINOSOS** NESTE SERVIDOR!!!',
      }]
    }).then(msg => {
      setTimeout(() => { msg.delete(); }, 5000);
    })
  }

}