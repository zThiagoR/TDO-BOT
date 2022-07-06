import { GuildMember, MessageButtonOptions } from "discord.js";
import { config } from "../../config";

export function HelpButton(member: GuildMember) {
  
  const buttons = [] as MessageButtonOptions[];
  
  if (member.roles.cache.has(config.cargos.movchat)) buttons.push({ 
    type: 'BUTTON', customId: 'movchat', label: 'Mov.Chat', style: 'SECONDARY'})
  if (member.roles.cache.has(config.cargos.movcall)) buttons.push({
    type: 'BUTTON', customId: 'movcall', label: 'Mov.Call', style: 'SECONDARY'})
  if(member.roles.cache.some(r => [config.cargos.recrutamento, config.cargos.recrutamento_externo].includes(r.id))) buttons.push({ 
    type: 'BUTTON', customId: 'recrutamento', label: 'Recrutamento', style: 'SECONDARY'})

    let actionRows;
    buttons.length === 0? actionRows = [] : actionRows = [{
      type: 'ACTION_ROW',
      components: buttons
    }]

    return actionRows;
}