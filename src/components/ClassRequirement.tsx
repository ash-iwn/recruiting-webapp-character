import React from 'react'


interface Props {
    name: string,
    attributes: AttributeProps,
    closeView: React.Dispatch<React.SetStateAction<boolean>>
}

export type AttributeProps = {
    Strength: Number,
    Dexterity: Number,
    Constitution: Number,
    Intelligence: Number,
    Wisdom: Number,
    Charisma: Number
}

function ClassRequirement({name, attributes, closeView}: Props) {
  return (
    <div>
    <h4>{name} Requirements</h4>

    <ul>
        <div>Strength: {attributes.Strength.toString()}  </div>
        <div>Dexterity:  {attributes.Dexterity.toString()} </div>
        <div>Constitution:  {attributes.Constitution.toString()} </div>
        <div>Intelligence:  {attributes.Intelligence.toString()} </div>
        <div>Wisdom:  {attributes.Wisdom.toString()} </div>
        <div>Charisma: {attributes.Charisma.toString()} </div>
    </ul>

    <button onClick={() => closeView(false)}>Close Requirement View</button>
    </div>
  )
}

export default ClassRequirement

