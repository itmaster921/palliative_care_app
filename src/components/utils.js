/**
 * @providesModule @utils
 */
import Sound from 'react-native-sound';

export function copy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? copy(v) : v;
    }
    return output;
}

export function playSound(url, onDone) {
  
    const callback = (error, sound) => {
      if (error) {
        alert(error.message);
        return;
      }
      sound.play(() => {
        // Release when it's done so we're not using up resources
        sound.release();
        if(onDone) onDone();
      });
    };
  
    const sound = new Sound(url, null, error => callback(error, sound));
}

export function playSounds(urls) {
    let i = 0;
    const nextSound = () => {
        playSound(urls[i], ()=>{
            i++;
            if(urls[i]) nextSound();
        })
    }
    nextSound()
}

export function fixSpaceInHTML(html){
    let tagWithSpaceMatch = /<([^>]+)>\s+<([^>]+)>/.exec(html);
    if(tagWithSpaceMatch){
        let tagWithSpace = tagWithSpaceMatch[0];
        let newTagWithSpace = tagWithSpace.replace(/\s/g, '') + " ";
        let newHtml = html.replace(tagWithSpace, newTagWithSpace);
        console.log({newHtml});
        return fixSpaceInHTML(newHtml);
    }else{
        console.log({html});
        return html;
    }
}