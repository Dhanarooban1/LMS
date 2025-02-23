import prisma from '../config/database.js';
import { apiResponse } from '../utils/apiResponse.js';

export const dashboardController = {
    
  getPendingReturns: async (req, res) => {
    try {
      const { date } = req.query;
      const targetDate = date ? new Date(date) : new Date();
      
      const pendingReturns = await prisma.issuance.findMany({
        where: {
          target_return_date: {
            lte: targetDate
          },
          issuance_status: 'BORROWED'
        },
        include: {
          Member: {
            select: {
              mem_name: true,
              mem_phone: true,
              mem_email: true
            }
          },
          Book: {
            select: {
              book_name: true,
              book_publisher: true
            }
          }
        }
      });
      
      const formattedResponse = pendingReturns.map(issue => ({
        member_name: issue.Member.mem_name,
        member_contact: {
          phone: issue.Member.mem_phone,
          email: issue.Member.mem_email
        },
        book_details: {
          name: issue.Book.book_name,
          publisher: issue.Book.book_publisher
        },
        issuance_date: issue.issuance_date,
        target_return_date: issue.target_return_date,
        days_overdue: Math.floor((targetDate - new Date(issue.target_return_date)) / (1000 * 60 * 60 * 24))
      }));
      
      return apiResponse.success(res, formattedResponse);
    } catch (error) {
      return apiResponse.error(res, error.message);
    }
  }
};

