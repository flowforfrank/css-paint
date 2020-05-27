class Pattern {
    static get inputProperties() { 
        return [
            '--pattern-color',
            '--pattern-size',
            '--pattern-spacing',
            '--pattern-shadow-blur',
            '--pattern-shadow-x',
            '--pattern-shadow-y'
        ]; 
    }
  
    paint(context, canvas, properties) {
        const getPropertyAsString = property => properties.get(property).toString().trim();
        const getPropertyAsNumber = property => parseInt(properties.get(property).toString());

        const props = {
            color: getPropertyAsString('--pattern-color'),
            size: getPropertyAsNumber('--pattern-size'),
            spacing: getPropertyAsNumber('--pattern-spacing'),
            shadow: {
                blur: getPropertyAsNumber('--pattern-shadow-blur'),
                x: getPropertyAsNumber('--pattern-shadow-x'),
                y: getPropertyAsNumber('--pattern-shadow-y')
            }
        };

        for (let x = 0; x < canvas.height / props.size; x++) {
            for (let y = 0; y < canvas.width / props.size; y++) {
                const bgColor = (x + y) % 2 === 0 ? '#FFF' : props.color;

                context.shadowColor = '#212121';
                context.shadowBlur = props.shadow.blur;
                context.shadowOffsetX = props.shadow.x;
                context.shadowOffsetY = props.shadow.y;

                context.beginPath();
                context.fillStyle = bgColor;
                context.rect(x * (props.size + props.spacing),
                             y * (props.size + props.spacing), props.size, props.size);
                context.fill();
            }
        }
    }
}

registerPaint('pattern', Pattern);