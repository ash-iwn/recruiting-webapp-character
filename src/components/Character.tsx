
import { useState } from "react";
import { SKILL_LIST, CLASS_LIST, ATTRIBUTE_LIST, SkillProps } from "../consts"
import ClassRequirement, { AttributeProps } from "./ClassRequirement"
import { Attributes } from "../types";
import { CheckResults } from "../App";
import { forwardRef, useRef, useImperativeHandle } from "react";

interface Props {
    id: number,
    checkResult: React.Dispatch<React.SetStateAction<CheckResults>>
    
}

type SkillCheckProps = {
    skill: string,
    dc: number,
}

export type CharacterExport = {
    attributes: AttributeProps,
    modifiers: AttributeProps,
    skills: SkillProps,
    classes: string[]
}


const Character = forwardRef(({id, checkResult}:Props, ref) => {
    const containerStyle = {
        border: 'solid'
    }
    const skillBoxStyle = {
        borderTop: '2px solid white'
    }

    const attributeBoxStyle = {
        borderBottom: '2px solid #474764'
    }

    useImperativeHandle(ref, () => ({

        export() {
          return exportCharacter();
        }
    
    }));
    


    const isClassStyle = {
        color: 'red'
    }

    const skillModifierStyle = {
        color: '#ac6666'
    }

    const totalSkillStyle = {
        color: 'green'
    }

    const [currentAttributeState, setAttributeState] = useState<AttributeProps>({
        Strength: 10,
        Dexterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10
    });

    const [currentSkillState, setSkillState ] = useState<SkillProps>({
        'Acrobatics': 0,
        'Animal Handling': 0,
        'Arcana': 0,
        'Athletics': 0,
        'Deception': 0,
        'History': 0,
        'Insight': 0,
        'Intimidation': 0,
        'Medicine': 0,
        'Nature': 0,
        'Perception': 0,
        'Performance': 0,
        'Persuasion': 0,
        'Religion': 0,
        'Sleight of Hand': 0,
        'Stealth': 0,
        'Survival': 0
    });

    const [skillCheckState, setSkillCheckState] = useState<SkillCheckProps>({
        skill: 'Acrobatics',
        dc: 20
    });

    function calculateModifier(attributeVal:number):number {
        return attributeVal >= 10 ? Math.floor((attributeVal-10)/2): Math.floor((attributeVal-10)/2);
    }

    function updateAttributeState(property, value: number) {
        if(getTotalAttributeSum() === 70 && value > 0) {
            alert('A Character can have upto 70 designated Attribute points');
        }
        else {
            setAttributeState(prevState => ({...prevState, [property]: prevState[property] + value >=0 ? prevState[property] + value : 0 }));

        }
        
        
    }

    function getTotalAttributeSum():Number {
        let sum = 0;

        Object.keys(currentAttributeState).forEach(val => {
            sum += currentAttributeState[val];
        });

        return sum;
    }

    function updateSkillState(property, value: number) {
    

        let totSum:number = getTotalSkillSum();
        let max:number = maxSkillPoints();
        if(totSum >= max && value > 0){
            alert('You need more skill points! Upgrade Intelligence to get more');
        }
        else {
            setSkillState(prevState => ({...prevState, [property]: prevState[property] + value >=0 ? prevState[property] + value : 0 }));
        }
        
    }

    function getTotalSkillSum():number {
        let SkillSum = 0;
        Object.keys(currentSkillState).forEach(val=>{
            SkillSum += currentSkillState[val]
        });

        return SkillSum;
    }

    function updateSkillCheckDC(event) {
        setSkillCheckState(prevState => ({...prevState, dc: Number(event.target.value) }));
    }

    function updateSkillCheckSkill(event) {
        setSkillCheckState(prevState => ({...prevState, skill: event.target.value }));
    }

    function roll(event) {
       

        const character:number = id;
        const skill:string = `${skillCheckState.skill} : ${currentSkillState[skillCheckState.skill]}`
        const roll:number = Math.floor(Math.random()*20);
        const dc:number = skillCheckState.dc;

        const result:string = currentSkillState[skillCheckState.skill] + roll >= dc ? 'Success' : 'Failure';


        checkResult(prevState => {
            return {character, skill, roll, dc, result}
        });
    }

    function isClass( prop:string ):boolean {
        let record = CLASS_LIST[prop];

        let flag = true;
       
        Object.keys(currentAttributeState).forEach(key => {
            if(currentAttributeState[key]<record[key]) {
               flag = false;
            }         
        })

        return flag;
    }

    function calculateTotalSkillPoints() {
        let max = maxSkillPoints();
        let SkillSum = getTotalSkillSum();

        return max-SkillSum > 0 ? max-SkillSum : 0;
    }

    function maxSkillPoints():number {
        return 10+ (4*calculateModifier(Number(currentAttributeState.Intelligence))); 
    }


    function exportCharacter():CharacterExport {
   

        let classArray = [];
        let mDict:AttributeProps = {
            Strength: 0,
            Dexterity: 0,
            Constitution: 0,
            Intelligence: 0,
            Wisdom: 0,
            Charisma: 0
        };

        
        Object.keys(CLASS_LIST).forEach(val=> {
            if(isClass(val)) {
                classArray.push(val);
            }
        })
     

        Object.keys(currentAttributeState).forEach( key => {
            mDict[key] = calculateModifier(currentAttributeState[key])
        });

        let val:CharacterExport = {
            attributes : currentAttributeState,
            skills: currentSkillState,
            classes: classArray,
            modifiers: mDict
        }

        return val;

    }

    const [showBarbarianContainer, setShowBarbarianContainer] = useState(false);
    const [showWizardContainer, setShowWizardContainer] = useState(false);
    const [showBardContainer, setshowBardContainer] = useState(false);
    return (
        <div style={containerStyle} className="container">
            <header>Character: {id}</header>
            <div>
                <h3>Skill Check </h3>

                <div className="row" >
                    <div className="col-2">
                        <h4>Skill:</h4>
                        <select defaultValue={'Acrobatics'} onChange={updateSkillCheckSkill}>
                            {SKILL_LIST.map((skill, index) => (
                                <option key={index} value={skill.name}>{skill.name}</option>
                            ))}
                        </select>
                    </div>
                   
                    <div className="col-2">
                    <h4>DC:</h4><input type='number' defaultValue={skillCheckState.dc} onChange={updateSkillCheckDC}></input>
                    </div>

                    <button className="col-2" onClick={roll} >Roll</button>

                   
                </div>

              

            </div>

            <div className="row">
                <div style={containerStyle} className="col-3">
                    <h3>Attributes</h3>
                    {
                        ATTRIBUTE_LIST.map((val, index) => (
                            <div style={attributeBoxStyle} key={index} className='row'>
                                <div className='col' >{val}  {currentAttributeState[val]}</div>
                                <button className='col' onClick={ ()=> { updateAttributeState(val.toString(), 1) }} >+</button>
                                &nbsp;
                                <button className='col' onClick={ ()=> { updateAttributeState(val.toString(), -1)} } >-</button>
                                <div> Modifier { calculateModifier(Number(currentAttributeState[val])) }</div>
                                
                            </div>
                           
                        ))
                    }
                </div>

                <div style={containerStyle} className="col-3">
                    <h3>Classes</h3>
                    <ul>
                        <div style={{ color: isClass('Barbarian') ? 'red': 'white'}} onClick={ () => { setShowBarbarianContainer(true); setShowWizardContainer(false); setshowBardContainer(false) }}>Barbarian</div>
                        <div style={{ color: isClass('Wizard') ? 'red': 'white'}} onClick={ () => {setShowWizardContainer(true); setShowBarbarianContainer(false);  setshowBardContainer(false); } }>Wizard</div>
                        <div style={{ color: isClass('Bard') ? 'red': 'white'}}  onClick={ () => {setshowBardContainer(true); setShowBarbarianContainer(false); setShowWizardContainer(false);   }}>Bard</div>
                    </ul>
                </div>

                { showBarbarianContainer &&
                    <div style={containerStyle} className="col-3">
                        <ClassRequirement name="Barbarian"  closeView={setShowBarbarianContainer}  attributes={CLASS_LIST.Barbarian}></ClassRequirement>
                    </div>
                }

                { showWizardContainer &&
                    <div style={containerStyle} className="col-3">
                        <ClassRequirement name="Wizard"  closeView={setShowWizardContainer}  attributes={CLASS_LIST.Wizard}></ClassRequirement>
                    </div>
                }

                { showBardContainer &&
                    <div style={containerStyle} className="col-3">
                        <ClassRequirement key="Bard" name="Bard" attributes={CLASS_LIST.Bard} closeView={setshowBardContainer} ></ClassRequirement>
                    </div>
                }


                <div style={containerStyle} className="col-3">
                    <h3>Skills</h3>

                    <h4>Total skill points available: { maxSkillPoints() }</h4>
                    <h4>Currently Used: {getTotalSkillSum()}</h4>

                    {SKILL_LIST.map((skill, index) => (
                        <div style={skillBoxStyle} className='row'>
                            <strong>{skill.name}: {currentSkillState[skill.name]}</strong>
                            <div style={skillModifierStyle}>Modifier({skill.attributeModifier}): {calculateModifier(currentAttributeState[skill.attributeModifier])} </div>
                            <button className='col' onClick={ ()=> { updateSkillState(skill.name, 1);} }>+</button>
                            &nbsp;
                            <button className='col' onClick={ ()=> { updateSkillState(skill.name, -1);} } >-</button>
                            <div style={totalSkillStyle}><strong>Total : { currentSkillState[skill.name] + calculateModifier(currentAttributeState[skill.attributeModifier]) }</strong></div>
                            
                        </div>
                      
                    ))}
                </div>
            </div>

           
        </div>
    )
});

export default Character; 