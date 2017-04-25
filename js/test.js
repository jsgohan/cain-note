// 题目：Given an array of integers, return indices of the two numbers such that they add up to a specific target.
// 给定一个整数数组，返回两个数的索引，使它们相加为一个特定的目标。
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// 您可以假设每个输入都有一个解决方案，您可能不使用同一个元素两次。

// Example:
// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

var nums = [2, 1, 3, 11, 7, 13, 9, 8, 15, -1], target = 10;

var returnArr = function (target, nums) {
    let obj = {},len = nums.length,tempstart = 0,tempend = len-1,flag = true,result = [];

    for(let i=0; i< nums.length; i++) {
        obj[nums[i]] = i;
    }
    let new_nums = nums.sort(function(a,b) {
        return a-b
    })

    console.log(new_nums)

    while(flag) {
        let value = +new_nums[tempstart] + (+new_nums[tempend]);
        if(new_nums[tempstart] >= target) return false;
        else if(new_nums[tempend] >= target) {
            if(new_nums[tempstart] < 0) {
                if(value > target) {
                    tempend--
                } else if(value < target) {
                    tempstart++;
                }  else if(value == target) {
                    flag = false
                    result.push(obj[new_nums[tempstart]])
                    result.push(obj[new_nums[tempend]])
                    return result
                }
            } else tempend--;
        } else if(value > target) {
            tempend--;
        } else if(value < target) {
            tempstart++;
        } else if(value == target) {
            flag = false
            result.push(obj[new_nums[tempstart]])
            result.push(obj[new_nums[tempend]])
            // return Array.prototype.push(obj[new_nums[tempstart]],obj[new_nums[tempend]]);
            return result
        }
    }
}

console.log(returnArr(target,nums));