//let's go

//plays.json

// {
//   "hamlet": { "name": "hamlet", "type": "tragedy" },
//   "as-like": { "name": "As You Like It", "type": "comedy" },
//   "othello": { "name": "Othello", "type": "tragedy" }
// }

//invoices.json
// {
//     [
//         {
//             "customer": "BigCo",
//             "performances": [
//                 {
//                     "playID": "hamlet",
//                     "audience": 55
//                 },
//                 {
//                     "playID": "as-like",
//                     "audience": 35
//                 },
//                 {
//                     "playID": "othello",
//                     "audience": 40
//                 }
//             ]
//         }
//     ]
// }

//打印账单详情的函数

function statement(invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statment for ${invoice.customer}\n`
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format

  for (let perf of invoice.performances) {
    // const play = plays[perf.playID]
    //以查询取代临时变量
    // const play = playFor(perf)

    //let thisAmount = 0
    //这个分支语句，用来计算一场戏剧演出的费用
    //将理解转化到代码里，将代码里的依赖关系转换为函数
    // switch (play.type) {
    //   case 'tragedy':
    //     thisAmount = 40000
    //     if (perf.audience > 30) {
    //       thisAmount += 1000 * (perf.audience - 30)
    //     }
    //     break
    //   case 'comedy':
    //     thisAmount = 30000
    //     if (perf.audience > 20) {
    //       thisAmount += 1000 + 500 * (perf.audience - 20)
    //     }
    //     thisAmount += 300 * perf.audience
    //     break
    //   default:
    //     throw new Error(`unknown type: ${play.type}`)
    // }

    //to amountFor func

    // let thisAmount = amountFor(perf, play)
    // let thisAmount = amountFor(perf, playFor(perf))
    // let thisAmount = amountFor(perf)

    //add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0)
    //add extra credit for every ten comedy attendees
    // if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5)
    if ('comedy' === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5)

    //print line for this order
    // result += `  ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats) \n`
    // result += `  ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats) \n`
    result += `  ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    } seats) \n`
    //totalAmount += thisAmount
    totalAmount += amountFor(perf)
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits \n`
  return result
}

//提升提炼出来的函数的表达能力
//perf --> aPerformance
//play 可以通过 performance变量计算得到，因此根本没有必要将它作为参数传入
function amountFor(perf) {
  //let thisAmount = 0
  let result = 0
  switch (playFor(perf).type) {
  case 'tragedy':
    //   thisAmount = 40000
    result = 40000
    if (perf.audience > 30) {
      // thisAmount += 1000 * (perf.audience - 30)
      result += 1000 * (perf.audience - 30)
    }
    break
  case 'comedy':
    //   thisAmount = 30000
    result = 30000
    if (perf.audience > 20) {
      // thisAmount += 1000 + 500 * (perf.audience - 20)
      result += 1000 + 500 * (perf.audience - 20)
    }
    //   thisAmount += 300 * perf.audience
    result += 300 * perf.audience
    break
  default:
    throw new Error(`unknown type: ${playFor(perf).type}`)
  }
  //   return thisAmount
  return result
}

function playFor(aPerformance, plays) {
  return plays[aPerformance.playID]
}
