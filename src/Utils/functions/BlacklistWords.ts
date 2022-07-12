import { Message } from "discord.js";

export default function BlacklistWords(msg: Message) {

  if(msg.content.match(/alguém namora/gi)) {
    msg.delete().catch((O_o) => {});
    return msg.reply({
      embeds: [{
        title: 'Estou solteiro, baby',
        description: 'Não sei como responder, mas você pode me chamar de **"namorado"** ou **"casado"** se preferir.\nMas prefiro ser chamado de amante ou ficante pra ter mais de 1 pessoa para formar trio romance',
      }]
    })
  }

  if(['gf', 'gozofone'].some(x => msg.content.toLowerCase().includes(x))) {
    msg.delete().catch((O_o) => {});
    msg.channel.send({
      content: `<@${msg.author.id}>`,
      embeds:[{
        title: `CARENTE FOI DETECTADO COM SUCESSO!`,
        color: 0xFFFF50,
        description: `**Tem coisa melhor que fazer GF**...\nOuvir a voz da pessoa que é magnifico, ver série, ver filme, fazer caminhada na rua, jogar joguinhos, ler livros, estudar pro curso, praticar e entre outros...`,
      }]
    }).then(msg => {
      setTimeout(() => { msg.delete(); }, 10000);
    })
  }

  const blacklistWords = msg.client.db.config.get(`${msg.guild.id}.blacklistWords`);
  if(blacklistWords.some(x => msg.content.toLowerCase().includes(x))) {
    msg.delete().catch((O_o) => {});
    msg.channel.send({
      content: `<@${msg.author.id}>`,
      embeds: [{
        color: 0x000000,
        title: '🔞 ANTI-PUTARIA',
        description: 'Não é mais permitido falar de **ATOS LIBIDINOSOS** NESTE SERVIDOR!!!',
      }]
    }).then(msg => {
      setTimeout(() => { msg.delete(); }, 10000);
    })
  }

  if(msg.content.match(/alguma menina( de)? 1[1-6]?/gmi)) {
    msg.delete().catch((O_o) => {});
    msg.channel.send({
      content: `<@${msg.author.id}>`,
      embeds: [{
        color: 0x000000,
        title: '👨‍👧 ANTI-PEDOFILIA',
        description: 'Pedofilia aqui não, vai trabalhar vagabundo',
      }]
    }).then(msg => {
      setTimeout(() => { msg.delete(); }, 10000);
    })
  }
}