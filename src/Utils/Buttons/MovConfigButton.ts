import { MessageActionRow, MessageButton } from "discord.js";

export default function MovConfigButton(value: string) {

  const editChannel = new MessageButton()
    .setCustomId(value === 'movchat' ? 'EditChannel' : 'EditCategory')
    .setLabel(value === 'movchat' ? 'Editar Canais' : 'Editar Categoria')
    .setStyle('DANGER')
  
  const editRole = new MessageButton()
    .setCustomId(value === 'movchat' ? 'EditRoleChat' : 'EditRoleCall')
    .setLabel('Editar Cargo')
    .setStyle('PRIMARY')

  const rows = new MessageActionRow()
    .addComponents(editChannel, editRole)

  return rows;
}