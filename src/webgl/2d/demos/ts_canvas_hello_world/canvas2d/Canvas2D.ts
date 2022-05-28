 export class Canvas2D {
    public context: CanvasRenderingContext2D | null;
    public constructor(canvas: HTMLCanvasElement) {
      this.context = canvas.getContext("2d");
    }
    public drawText(text: string) {
      if (this.context === null) {
        throw new Error("Failed to get context");
      }
      // Canvas2D和webGL这种底层绘图API都是状态机模式
      //每次绘制前调用save将即将要修改的状态记录下来
      //每次绘制后调用restore将已修改的状态丢弃，恢复到初始化时的状态
      //这样的好处是状态不会混乱 //假设当前绘制文本使用红色，如果你没有使用save/restore配对函数的
      //则下次调用其他绘图函数时，如果你没更改颜色，则会继续使用上次设置 的红色进行绘制
      //随着程序越来越复杂，如不使用save/restore来管理，最后整个渲染状 态会极其混乱
      //请时刻保持使用save / restore配对函数来管理渲染状态
      this.context.save();
      this.context.textBaseline = "middle";
      this.context.textAlign = "center";
      let centerX = this.context.canvas.width / 2;
      let centerY = this.context.canvas.height / 2;
      this.context.fillStyle = "red";
      this.context.fillText(text, centerX, centerY);
      this.context.strokeStyle = "blue";
      this.context.strokeText(text, centerX, centerY);
      this.context.restore();
    }
  }