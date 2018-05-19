import React,{Component} from 'react'
import '../../index.css';

class Preson extends Component{
    render() {
        let _style = {
            color: 'red'
        };
        return(
            <div className="preson">
                <p style={_style} onClick={this.props.myclick}>I like KiKi, she is my wife.I love her everything.But I don't want her to be too tired, I know, we all have their own goals, and we have a yearning life. I should take more of the family, which is the responsibility of a man. Although we haven't known each other for a long time, from the moment we look at it, I am sure that she will be my partner for the rest of my life. Since I met her, the center of life began to balance, because at the age of 27, I had a lover. She was sometimes silly, sometimes especially serious, especially the attitude to work. It was a Work pervert, even before we knew it, she called me so. Hahaha, this moment, I think of her again, warm heart, well, to work to the point, she should be with the children at this time in class, want to accompany her around,(๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤ love your Mr. Yang.</p>
                <p>I am Mr.Yang ---> I {this.props.children} and {this.props.msg}</p>
                <input type="text" onChange={this.props.changed}/>
            </div>
        )
    }
}
/*let Preson = ()=> {
    return(
        <p>I like KiKi, she is my wife.</p>
    )
}*/
export default Preson;

