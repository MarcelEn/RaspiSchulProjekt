const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]


//Exports
export const proxyToValue = proxy => proxy.target.value;

export const proxyToName = proxy => proxy.target.name;

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

//TODO: remove static link
export const getUserImageUrlByUsername = id => '/avatar.jpgf';

export const getColorOfLetter = (firstletter, lastletter) => {
    const combinedIndex =
        alphabet.indexOf(firstletter[0].toUpperCase()) +
        alphabet.indexOf(lastletter[0].toUpperCase())

    let colorRotatorPosition = 1;
    let colorRotator = [255, 0, 0];
    let colorRotatorSteps = 255 * 6 / alphabet.length;

    for (let i = 0; i < combinedIndex; i++) {
        switch (colorRotatorPosition) {
            case 1:
                colorRotator[1] += colorRotatorSteps;
                if (colorRotator[1] >= 255) {
                    colorRotator[1] = 255;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 2:
                colorRotator[0] -= colorRotatorSteps;
                if (colorRotator[0] <= 0) {
                    colorRotator[0] = 0;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 3:
                colorRotator[2] += colorRotatorSteps;
                if (colorRotator[2] >= 255) {
                    colorRotator[2] = 255;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 4:
                colorRotator[1] -= colorRotatorSteps;
                if (colorRotator[1] <= 0) {
                    colorRotator[1] = 0;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 5:
                colorRotator[0] += colorRotatorSteps;
                if (colorRotator[0] >= 255) {
                    colorRotator[0] = 255;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 6:
                colorRotator[2] -= colorRotatorSteps;
                if (colorRotator[2] <= 0) {
                    colorRotator[2] = 0;
                    colorRotatorPosition = 1;
                    break;
                }
                break;
            default:
                colorRotatorPosition = 1;
        }
    }


    return 'rgb(' + colorRotator[0] + ',' + colorRotator[1] + ',' + colorRotator[2] + ')';
}